// import type { learnerProfile, AssignmentGroup, AssignmentInfo, LearnerSubmission, LearnerSubmissions } from "./dataTypes";
import {
  CourseInfo,
  AssignmentGroup,
  LearnerSubmissions,
} from "./src/index.mjs";

function getLearners(submissions) {
  const learners = [];
  submissions.forEach((element) => {
    if (!learners.includes(element.learner_id)) {
      learners.push(element.learner_id);
    }
  });
  return learners;
}

function getLearnerData(course, ag, submissions) {
  try {
    if (ag.course_id !== course.id) {
      throw new Error("Course IDs does not match");
    }
    const learners = getLearners(submissions);

    // Initialize object with ID and scores for each learner
    const learnersArray = [];
    learners.forEach((learner_id) => {
      let learnerData = {
        id: learner_id,
        avg: 0,
      };
      let pointsEarned = 0;
      let pointsPossible = 0;
      // Check each submission
      submissions.forEach((element) => {
        // Check if learner_id matches
        if (element.learner_id === learner_id) {
          // Go through each assignment, match the assignment_id, add scores to total
          for (let i = 0; i < ag.assignments.length; i++) {
            if (ag.assignments[i].id === element.assignment_id) {
              //check due date

              console.log(`learner ID ` + learner_id);
              let submitDate = new Date(element.submission.submitted_at);
              // console.log(`submitDate ` + submitDate);
              let dueDate = new Date(ag.assignments[i].due_at);
              // console.log(`dueDate ` + dueDate);

              // 10% off for late submission
              if (submitDate > dueDate) {
                pointsEarned += element.submission.score * 0.9;
                console.log(`late earned ` + pointsEarned);
              } else {
              pointsEarned += element.submission.score;
              console.log(`earned ` + pointsEarned);
            }
            pointsPossible += ag.assignments[i].points_possible;
            console.log(`possible ` + pointsPossible);
          }
        }
      }
      });

      // Check if pointsPossible is greater than 0
      if (pointsPossible > 0) {
        learnerData.avg = pointsEarned / pointsPossible;
        learnersArray.push(learnerData);
      } else {
        throw new Error(
          `Total points possible cannot be zero or less for learner ID ${learner_id}`
        );
      }
    });
    return learnersArray;
  } catch (error) {
    console.error(error.message);
  }
}

console.log(getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions));
