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

// Refactored calculatePoints as separate function
function calculatePoints(element, assignment) {
  let submitDate = new Date(element.submission.submitted_at);
  let dueDate = new Date(assignment.due_at);
  let pointsEarned = element.submission.score;

  // Late submission penalty
  if (submitDate > dueDate) {
    pointsEarned *= 0.9
  }
  return pointsEarned;
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
              pointsEarned += calculatePoints(element, ag.assignments[i]);
              pointsPossible += ag.assignments[i].points_possible;
              learnerData[ag.assignments[i].id] = calculatePoints(element, ag.assignments[i]) / ag.assignments[i].points_possible;

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
