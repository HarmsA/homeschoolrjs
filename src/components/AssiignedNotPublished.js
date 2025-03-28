import React from 'react';
import './AssignedNotPublished.css'
import { useCollection } from '../hooks/useCollection'

import isBefore from 'date-fns/isBefore'

import { Link } from 'react-router-dom'
import formatDistanceToNow from "date-fns/esm/formatDistanceToNow";
import { isPast } from 'date-fns';
import { isFuture } from "date-fns";
import toDate from 'date-fns/toDate'
import { isEqual } from "date-fns";

function compareDates(lDate){
  let current = new Date();
  if (!lDate)
    return true
  // console.log("lDate: ",lDate.toDate())
  // console.log("current: ", current)
  return lDate.toDate()>=current;
}

function isOlder(d) {
  let current = new Date();
  d.setHours(0, 0, 0, 0);
  current.setHours(0, 0, 0, 0);
//   console.log("D: ", d)
//   console.log("CURRENT: ", current);
  if (d < current) {

    return true;
  }
    else;
    return false
}
function isToday(d) {
  let current = new Date();
  d.setHours(0, 0, 0, 0);
  current.setHours(0, 0, 0, 0);
  console.log("D: ", d)
  console.log("CURRENT: ", current);
  if (isEqual(d,current)) {

    return true;
  }
    else;
    return false
}

const AssignmentNotPublished = ({ projects }) => {
    const today = new Date();
    return (
      <div className="project-list">
        {projects.length === 0 && <p>No Future Assignments!</p>}
        {projects.map((project) => (
          <React.Fragment key={project.id}>
            {compareDates(project.liveDate) && (
              <Link to={`/projects/${project.id}`} key={project.id}>
                <h4 style={{ textTransform: "capitalize" }}>{project.title}</h4>
                <p style={{ textTransform: "capitalize" }}>
                  {project.category}
                </p>
                <p style={{fontStyle: 'italic'}}>Date to live: {project.liveDate}</p>
                        <div id="project-dates">

                  <p
                    className={`date ${
                      isOlder(project.dueDate.toDate()) && "late"
                    } ${isToday(project.dueDate.toDate()) && "today"}`}
                  >
                    Due by{" "}
                    <span>{project.dueDate.toDate().toDateString()}</span>
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

export default AssignmentNotPublished;