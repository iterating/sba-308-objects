
// shared Variables
// input dataTypes

export interface CourseInfo {
  "id": number,
  "name": string,
}

export interface AssignmentGroup {
  "id": number,
  "name": string,
  // the ID of the course the assignment group belongs to
  "course_id": number,
  // the percentage weight of the entire assignment group
  "group_weight": number,
  "assignments": [AssignmentInfo],
}

export interface AssignmentInfo {
  "id": number,
  "name": string,
  // the due date for the assignment
  "due_at": Date,
  // the maximum points possible for the assignment
  "points_possible": number,
}

export type LearnerSubmissions = [
  LearnerSubmission
]

export interface LearnerSubmission {
    "learner_id": number,
    "assignment_id": number,
    "submission": {
      "submitted_at": Date,
      "score": number
    },
}

export interface learnerProfile {
  // the ID of the learner for which this data has been collected
  "id": number,
  // the learner’s total, weighted average, in which assignments
  // with more points_possible should be counted for more
  // e.g. a learner with 50/100 on one assignment and 190/200 on another
  // would have a weighted average score of 240/300 = 80%.
  "avg": number,
  // each assignment should have a key with its ID,
  // and the value associated with it should be the percentage that
  // the learner scored on the assignment (submission.score / points_possible)
  "assignment_id": number,
  // if an assignment is not yet due, it should not be included in either
  // the average or the keyed dictionary of scores
}