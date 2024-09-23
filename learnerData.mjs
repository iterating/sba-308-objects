import { CourseInfo, AssignmentGroup, LearnerSubmissions } from "./src/index.mjs";

export function getLearners(submissions) {
  const learners = [];
  submissions.forEach((element) => {
    if (!learners.includes(element.learner_id)) {
      learners.push(element.learner_id);
    }
  });
  return learners;
}

// Refactored calculatePoints as separate function
export function calculatePoints(element, assignment) {
  let submitDate = new Date(element.submission.submitted_at);
  let dueDate = new Date(assignment.due_at);
  let pointsEarned = element.submission.score;

  // Late submission penalty
  if (submitDate > dueDate) {
    pointsEarned *= 0.9;
  }
  return pointsEarned;
}

export function getLearnerData(course, ag, submissions) {
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
      const assignmentScores = {};
      // Check each submission
      submissions.forEach((element) => {
        // Check if learner_id matches
        if (element.learner_id === learner_id) {
          // Go through each assignment, match the assignment_id, add scores to total
          for (let i = 0; i < ag.assignments.length; i++) {
            if (ag.assignments[i].id === element.assignment_id) {
              pointsEarned += calculatePoints(element, ag.assignments[i]);
              pointsPossible += ag.assignments[i].points_possible;
              // Spent a long time trying to get the score keys to the enf of my object not the beginning. Works with toFixed
              learnerData[ag.assignments[i].id.toFixed(1)] =
                calculatePoints(element, ag.assignments[i]) /
                ag.assignments[i].points_possible;
            }
          }
        }
      });
      // Check if pointsPossible is greater than 0
      if (pointsPossible > 0) {
        learnerData.avg = (pointsEarned / pointsPossible).toFixed(3);

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

// Display in HTML table
export function displayLearnerData(course, ag, submissions) {
  const tableBody = document.querySelector("#learnerTable tbody");
  const tableHead = document.querySelector("#learnerTable thead tr");

  if (!tableBody || !tableHead) {
    console.error("Table body or header not found!");
    return;
  }

  tableBody.innerHTML = ""; 
  tableHead.innerHTML = `<th>LearnerID</th><th>Course Name</th><th>Avg</th>`; // Reset header

  // Add assignment headers
  ag.assignments.forEach(assignment => {
    const assignmentHeader = document.createElement("th");
    assignmentHeader.textContent = `Assignment ${assignment.id}`;
    tableHead.appendChild(assignmentHeader);
  });

  const learnersData = getLearnerData(course, ag, submissions);

  learnersData.forEach(learner => {
    const row = document.createElement("tr");

    // Learner ID
    const idCell = document.createElement("td");
    idCell.textContent = learner.id;
    row.appendChild(idCell);

    // Course Name
    const courseNameCell = document.createElement("td");
    courseNameCell.textContent = course.name;
    row.appendChild(courseNameCell);

    // Average score
    const avgCell = document.createElement("td")
    avgCell.textContent = (learner.avg * 100).toFixed(1) + "%";
    row.appendChild(avgCell);

    // Assignment scores
    ag.assignments.forEach(assignment => {
      const scoreCell = document.createElement("td");
      const score = learner[assignment.id.toFixed(1)];
      scoreCell.textContent = score !== undefined ? (score * 100).toFixed(0) + "%" : "N/A";
      row.appendChild(scoreCell);
    });

    // Append the row to the table body
    tableBody.appendChild(row);
  });
}
