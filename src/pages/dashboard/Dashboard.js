import React from 'react';
import {useCollection} from '../../hooks/useCollection'
import ProjectList from "../../components/ProjectList";
import Completed from "../../components/Completed";
import './Dashboard.css'
import CompletedGradeNeeded from "../../components/CompletedGradeNeeded";
// import { timestamp } from '../../firebase/config'


const Dashboard = () => {

    const {documents, error} = useCollection('projects','','', '','dueDate','asc')

    // const {documents, error} = useCollection('projects','','', '','dueDate','asc')
    // console.log({completedDocuments})
    // console.log({completedError})
    return (
        <div>
            <h2 className="page-title">Dashboard</h2>
            {error && <p className="error">{error}</p>}
            <div>
                {documents && <ProjectList projects={documents}/>}

            </div>
            <div>
                <CompletedGradeNeeded />
                <Completed/>
            </div>

        </div>
    );
};

export default Dashboard;