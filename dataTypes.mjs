export interface CourseInfo {
  id: number; 
  name: string;
}

export interface AssignmentInfo {
  id: number;
  name: string;
  due_at: Date; 
  points_possible: number; // Maximum points possible for the assignment
}

export interface AssignmentGroup {
  id: number;
  name: string;
  course_id: number; // The ID of the course the assignment group belongs to
  group_weight: number; // The percentage weight of the entire assignment group
  assignments: AssignmentInfo[]; 
}

export interface LearnerSubmissions {
  learner_id: number;
  assignment_id: number;
  submission: {
    submitted_at: Date;
    score: number;
  };
}

