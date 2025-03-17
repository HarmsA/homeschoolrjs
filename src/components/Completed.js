import React from 'react';
import {useCollection} from '../hooks/useCollection'
import './ProjectList.css'
import './Completed.css'
import {Link} from "react-router-dom";
// import isBefore from "date-fns/isBefore";
// import formatDistanceToNow from "date-fns/esm/formatDistanceToNow";
import {timestamp} from "../firebase/config";


const Completed = () => {
    // const { isPending, error, documents } = useCollection('projects')
    const today = new Date()
    today.setHours(0,0,0,0)
    // const yesterday = new Date(today)
    // yesterday.setDate(yesterday.getDate() )
    const compareDate = timestamp.fromDate(new Date(today))

    const {documents, error} = useCollection('projects','completedDate','>', compareDate,'completedDate','asc')


    return (
        <>
            <h2 className='completed-header'>Completed Assignments Within 24hrs</h2>
            <div className='project-list completed' >
                {error && <div>{error}</div>}
             {documents && documents.length === 0 && <p>None!</p>}
                {documents && documents.map(project => (
                  <React.Fragment key={project.id}>
                      {project.completed &&
                        <Link to={`/projects/${project.id}`} key={project.id}>
                          <h4 style={{textTransform: 'capitalize'}}>{project.title}</h4>
                          <p style={{textTransform: 'capitalize'}}>{project.category}</p>
                            <p>Completed {project.completedDate.toDate().toDateString()}</p>
                            <p>Grade: {project.grade}</p>
                            {/*<div id="project-dates">*/}
                            {/*      <p className={`date ${isBefore(project.dueDate.toDate(), today) && 'late'}`}>*/}
                            {/*          Due by <span>{project.dueDate.toDate().toDateString()}</span>*/}
                            {/*      </p>*/}
                            {/*    <p>Created: {formatDistanceToNow(project.createdAt.toDate(), {addSuffix: true})}</p>*/}
                            {/*</div>*/}
                        </Link>
                      }
                </React.Fragment>
                    ))}

              </div>
        </>
    );
};

export default Completed;