
// import type { learnerProfile, AssignmentGroup, AssignmentInfo, LearnerSubmission, LearnerSubmissions } from "./dataTypes";
import { CourseInfo, AssignmentGroup,  LearnerSubmissions } from "./src/index.mjs";

function getLearnerData(course , ag , submissions) {
    // here, we would process this data to achieve the desired result.
try{
  if (ag.course_id !== course.id){
    throw new Error(`Course IDs does not match`)
  }

  // the ID of the learner for which this data has been collected
//let id = submissions[0].learner_id
    const learners = [];
    submissions.forEach(element => {
      if(!learners.includes(element.learner_id)){
        learners.push(element.learner_id);
      }
    });
    
  const learnersArray = [];
    // Make object with ID and scores for each learner
    learners.forEach(learner_id => {
      let learnerData = {
          id: learner_id,
          avg: 0
      };
      let pointsEarned = 0;
      let pointsPossible = 0;
      
    // Check each submission
    submissions.forEach(element => {
      // Check if learner_id matches
      if (element.learner_id === learner_id) {
          // Go through each assignment, match the assignment_id, add scores to total
        for (let i = 0; i < ag.assignments.length; i++) {
          if (ag.assignments[i].id === element.assignment_id) {
            pointsEarned += element.submission.score;
            pointsPossible += ag.assignments[i].points_possible;
            }
          }
        }
      });
      learnerData.avg = pointsEarned/pointsPossible          
      learnersArray.push(learnerData)
      console.log(learnersArray)
    })
} catch(error){
   console.error(error.message);
}
}

console.log(getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions))