import React from "react";
import { formatDistanceToNow, isEqual, isBefore } from "../utils/dateUtils";
import { Link } from "react-router-dom";
import "./ProjectList.css";


function compareDates(lDate) {
  let current = new Date();
  if (!lDate) return true;
  // console.log("lDate: ",lDate.toDate())
  // console.log("current: ", current)
  return lDate.toDate() <= current;
}

function isOlder(d) {
  let current = new Date();
  d.setHours(0, 0, 0, 0);
  current.setHours(0, 0, 0, 0);
  //   console.log("D: ", d)
  //   console.log("CURRENT: ", current);
  return isBefore(d, current);
}
function isToday(d) {
  let current = new Date();
  d.setHours(0, 0, 0, 0);
  current.setHours(0, 0, 0, 0);
  console.log("D: ", d);
  console.log("CURRENT: ", current);
  if (isEqual(d, current)) {
    return true;
  } else;
  return false;
}

const ProjectList = ({ projects }) => {
  const today = new Date();
  return (
    <div className="project-list">
      {projects.length === 0 && <p>No projects yet!</p>}
      {projects.map((project) => (
        <React.Fragment key={project.id}>
          {!project.completed && compareDates(project.liveDate) && (
            <Link to={`/projects/${project.id}`} key={project.id}>
              <h4 style={{ textTransform: "capitalize" }}>{project.title}</h4>
              <p style={{ textTransform: "capitalize" }}>{project.category}</p>
              <div id="project-dates">
                <p
                  className={`date ${
                    isOlder(project.dueDate.toDate()) && "late"
                  } ${isToday(project.dueDate.toDate()) && "today"}`}
                >
                  Due by <span>{project.dueDate.toDate().toDateString()}</span>
                </p>
                <p>
                  Created:{" "}
                  {formatDistanceToNow(project.createdAt.toDate(), {
                    addSuffix: true,
                  })}
                </p>
              </div>
            </Link>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default ProjectList;
