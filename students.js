// import type { learnerProfile, AssignmentGroup, AssignmentInfo, LearnerSubmission, LearnerSubmissions } from "./dataTypes";
import { CourseInfo, AssignmentGroup, LearnerSubmission, LearnerSubmissions } from "./src/index.mjs";


function getLearnerData(course , ag , submissions) {
    // here, we would process this data to achieve the desired result.
  if (AssignmentGroup.assignments[i] !== LearnerSubmissions[i].assignment_id)
    try[{

    const result = [
      {
        // the ID of the learner for which this data has been collected
      id: LearnerSubmissions[0].learner_id
    // the learner’s total, weighted average, in which assignments
    // with m ore points_possible should be counted for more
    // e.g. a learner with 50/100 on one assignment and 190/200 on another
    // would have a weighted average score of 240/300 = 80%.
        avg: 0.985, // (47 + 150) / (50 + 150)
        1: 0.94, // 47 / 50
        2: 1.0 // 150 / 150

        avg: LearnerSubmission[i].submission.score / AssignmentGroup.assignments[i].points_possible
      },
      {
    // each assignment should have a key with its ID,
  // and the value associated with it should be the percentage that
  // the learner scored on the assignment (submission.score / points_possible)
        id: 132,
        avg: 0.82, // (39 + 125) / (50 + 150)
        1: 0.78, // 39 / 50
        2: 0.833 // late: (140 - 15) / 150

  // if an assignment is not yet due, it should not be included in either
  // the average or the keyed dictionary of scores
      }
    } catch {
      throw new Error("error.message");
    }
    }
    ];
  
    return result;
  }
  
  const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);