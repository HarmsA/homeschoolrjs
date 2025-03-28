import React, {useState} from 'react';
import './StoredCompleted.css'
import {useCollection} from '../../hooks/useCollection'
// import Avatar from "../../components/Avatar";
// import formatDistanceToNow from "date-fns/esm/formatDistanceToNow";
import {Link, NavLink} from "react-router-dom";
import isBefore from "date-fns/isBefore";
import '../../components/ProjectList.css'
import {categories} from '../create/Create'
// import {timestamp} from "../../firebase/config";
import CompletedGradeNeeded from "../../components/CompletedGradeNeeded";
import DashboardIcon from "../../assets/transaction-list.png";


const StoredCompleted = () => {
    const {documents, error} = useCollection('projects','completed','==', true,'completedDate','desc')
    const [filtered, setFiltered] = useState('All');
    const today = new Date();

    const customSearch = (e) => {
        setFiltered(e.target.id)
    }

    return (
        <div>
            <Link exact to='/completed/gridView'>
                <img src={DashboardIcon} alt="Dashboard icon"/>
                <span>Grid View</span>
            </Link>
            <CompletedGradeNeeded />
            <h1>Completed Homework Assignments</h1>

            <ul className='category-list'>
                <li>
                    <span onClick={customSearch} id='All'>All </span>
                </li>
                {categories.map(category => (
                    <li key={category.value}>
                        <span onClick={customSearch} id={category.label}>{category.label} </span>
                    </li>
                ))}
            </ul>
            {error && <div>{error}</div>}

            <div className="project-list">
                {documents && documents.map(project => (
                     <React.Fragment  key={project.id}>
                        {filtered === project.category &&

                            <Link to={`/projects/${project.id}`} key={project.id}>
                              <h4 style={{textTransform: 'capitalize'}}>{project.title}</h4>
                              <p style={{textTransform: 'capitalize'}}>{project.category}</p>
                              <p style={{fontStyle: 'italic'}}>Grade: {project.grade}%</p>
                                <div id="project-dates">
                                      <p className={`date ${isBefore(project.dueDate.toDate(), today) && 'late'}`}>
                                          Was due <span>{project.dueDate.toDate().toDateString()}</span>
                                      </p>
                                </div>
                                    <p>Completed: {project.completedDate.toDate().toDateString()}</p>
                            </Link>
                        }
                        {filtered === 'All' &&
                            <Link to={`/projects/${project.id}`} key={project.id}>
                              <h4 style={{textTransform: 'capitalize'}}>{project.title}</h4>
                              <p style={{textTransform: 'capitalize'}}>{project.category}</p>
                                <div id="project-dates">
                                      {/*<p className={`date ${isBefore(project.dueDate.toDate(), today) && 'late'}`}>*/}
                                      {/*    Was due <span>{project.dueDate.toDate().toDateString()}</span>*/}
                                      {/*</p>*/}

                                    <p>Completed: {project.completedDate.toDate().toDateString()}</p>
                                    {project.grade && <p>Grade: {project.grade}%</p>}
                                </div>
                            </Link>
                        }
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

export default StoredCompleted;