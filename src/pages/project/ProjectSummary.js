import React, { useState } from "react";
import "./Project.css";
import { isBefore } from "../../utils/dateUtils";
import { useFirestore } from "../../hooks/useFirestore";
import { useNavigate } from "react-router-dom";
import ProjectUpdateForm from "./ProjectUpdateForm";

const ProjectSummary = ({ project }) => {
    // const { user } = useAuthContext()
    const navigate = useNavigate();
    const today = new Date();
    // const { updateDocument, response } = useFirestore('projects')

    const { deleteDocument } = useFirestore("projects");
    const [isEditing, setIsEditing] = useState(false);

    const completed = project.completed;

    const handleDelete = async () => {
        await deleteDocument(project.id);
        navigate("/");
    };

    if (isEditing) {
        return (
            <div>
                <ProjectUpdateForm
                    docTitle={project.title}
                    docCompleted={project.completed}
                    docDueDate={project.dueDate}
                    docAssignmentDetails={project.details}
                    docAssignedCategory={project.category}
                    projectId={project.id}
                    docCompletedDate={project.completedDate}
                    docGrade={project.grade}
                    onCancel={() => setIsEditing(false)}
                />
            </div>
        );
    }

    return (
        <div className="project-summary">
            <h2 className="page-title">{project.title}</h2>
            {!completed && (
                <p
                    className={`due-date ${isBefore(project.dueDate.toDate(), today) && "late"}`}
                >
                    Assignment is due{" "}
                    {project.dueDate.toDate().toDateString()}
                </p>
            )}
            <p className="details">{project.details}</p>
            {project.completed && (
                <p>
                    Completed:{" "}
                    {project.completedDate.toDate().toDateString()}
                </p>
            )}
            {project.grade && <p>Grade: {project.grade}%</p>}
            <div className="comments-date">
                <p>
                    Created: {project.createdAt.toDate().toDateString()}
                </p>
            </div>
            <div className="button-container">
                <button className="btn-delete" onClick={handleDelete}>
                    Delete
                </button>
                <button
                    className="btn"
                    onClick={() => setIsEditing(true)}
                >
                    Edit
                </button>
            </div>
        </div>
    );
};

export default ProjectSummary;
