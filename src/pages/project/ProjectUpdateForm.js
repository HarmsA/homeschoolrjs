import React, { useState } from "react";
// import styles from './Create.module.css'
import { LocalizationProvider } from "@mui/x-date-pickers";
import { CustomDateAdapter } from "../../utils/dateUtils";
import { DatePicker } from "@mui/x-date-pickers";
import { timestamp } from "../../firebase/config";
// import { useAuthContext } from '../../hooks/useAuthContext'
import { FormControlLabel, Stack, TextField } from "@mui/material";
import Select from "@mui/material/Select";
// import Checkbox from '@material-ui/core/Checkbox';
import Checkbox from "@mui/material/Checkbox";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import "./Project.css";
// import { useCollection } from '../../hooks/useCollection'
import { useFirestore } from "../../hooks/useFirestore";
import { useNavigate } from "react-router-dom";

export const categories = [
    { value: "art", label: "Art" },
    { value: "bible", label: "Bible" },
    { value: "composition", label: "Composition" },
    { value: "cultural_conversations", label: "Culture Conversations" },
    {
        value: "family_and_consumer_science",
        label: "Family and Consumer Science",
    },
    { value: "foreign_language", label: "Foreign Language" },
    { value: "computer_science", label: "Computer Science" },
    { value: "general", label: "General" },
    { value: "grammar", label: "Grammar" },
    { value: "health", label: "Health" },
    { value: "history", label: "History" },
    { value: "literature", label: "Literature" },
    { value: "math", label: "Math" },
    { value: "music", label: "Music" },
    { value: "science", label: "Science" },
    { value: "spelling", label: "Spelling" },
    { value: "vocabulary", label: "Vocabulary" },
];

const ProjectUpdateForm = ({
    docTitle,
    docDueDate,
    docCompleted,
    docAssignedCategory,
    docAssignmentDetails,
    projectId,
    docCompletedDate,
    docGrade,
}) => {
    // const { user } = useAuthContext()
    const navigate = useNavigate();
    const { updateDocument, response } = useFirestore("projects");
    const [title, setTitle] = useState(docTitle);
    const [assignmentDetails, setAssignmentDetails] =
        useState(docAssignmentDetails);
    const [dueDate, setDueDate] = useState(docDueDate);
    const [assignedCategory, setAssignedCategory] =
        useState(docAssignedCategory);
    const [error, setError] = useState(null);
    const [isCompleted, setIsCompleted] = useState(docCompleted);
    const [grade, setGrade] = useState(docGrade);
    if (grade === null) {
        setGrade("");
    }
    let today = new Date();
    if (docCompletedDate !== "") {
        today = docCompletedDate.toDate();
    }

    const [completedDate, setCompletedDate] = useState(today);

    const handleChange = (event) => {
        setIsCompleted(event.target.checked);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        if (!title) {
            setError("Title Field Required");
            return;
        }
        if (!assignmentDetails) {
            setError("Assignment Field Required");
            return;
        }
        if (!dueDate) {
            setError("Due Date Field Required");
            return;
        }
        if (!assignedCategory) {
            setError("Category Field Required");
            return;
        }
        // const createdBy = {
        //     displayName: user.displayName,
        //     photoURL: user.photoURL,
        //     id: user.uid
        // }
        // Create Document

        // Updating document
        const projectToUpdate = {
            title,
            details: assignmentDetails,
            category: assignedCategory,
            completed: isCompleted,
            dueDate: timestamp.fromDate(new Date(dueDate)),
            grade: grade,
            completedDate: timestamp.fromDate(new Date(completedDate)),
        };

        // if (isCompleted && !grade){
        //     setError('If an assignment is completed a grade must be entered.')
        //     return
        // }
        if (!isCompleted && grade) {
            setError(
                "Please check assignment completed when a grade is entered.",
            );
            return;
        }
        if (grade) {
            if (Number(grade) >= 0 && Number(grade) <= 100) {
                await updateDocument(projectId, {
                    grade: Number(grade),
                });
            } else {
                setError("Grade must be between 0-100.");
                return;
            }
        }

        if (isCompleted) {
            await updateDocument(projectId, {
                completedDate: timestamp.fromDate(new Date(completedDate)),
            });
        }
        if (isCompleted) {
            await updateDocument(projectId, {
                completed: isCompleted,
            });
        }
        if (docTitle !== projectToUpdate.title) {
            await updateDocument(projectId, {
                title: projectToUpdate.title,
            });
        }

        if (docAssignmentDetails !== projectToUpdate.details) {
            await updateDocument(projectId, {
                details: assignmentDetails,
            });
        }
        if (docAssignedCategory !== projectToUpdate.category) {
            await updateDocument(projectId, {
                category: projectToUpdate.category,
            });
        }
        // if (docCompleted !== projectToUpdate.completed) {
        //     console.log(completedDate)
        //     await updateDocument(projectId, {
        //         completed: projectToUpdate.completed,
        //         completedDate: timestamp.fromDate(new Date(completedDate)),
        //     })
        // }

        if (docDueDate !== projectToUpdate.category) {
            await updateDocument(projectId, {
                dueDate: timestamp.fromDate(new Date(dueDate)),
            });
            if (!response.error) {
                navigate.push("/");
            }
        }
    };

    return (
        <div className="create-form">
            {/*{!isUpdating*/}
            {/*    ? <h2 className='page-title'>Create Assignment</h2>*/}
            <h2 className="page-title">Updating Assignment</h2>
            {/*}*/}
            {error && <h6 className="error">{error}</h6>}
            <form onSubmit={handleSubmit}>
                <LocalizationProvider dateAdapter={CustomDateAdapter}>
                    <Stack spacing={4} sx={{ width: "auto" }}>
                        <TextField
                            id="outlined-required"
                            label="Assignment Title: "
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />

                        <TextField
                            id="outlined-textarea"
                            label="Assignment Details: "
                            multiline
                            defaultValue={assignmentDetails}
                            onChange={(text) =>
                                setAssignmentDetails(text.target.value)
                            }
                        />
                        {dueDate ? (
                            <DatePicker
                                renderInput={(params) => (
                                    <TextField {...params} />
                                )}
                                label="Set due date:"
                                type="date"
                                value={dueDate}
                                sx={{ width: 220 }}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onChange={(newDate) => {
                                    setDueDate(newDate);
                                }}
                                dateValue={dueDate}
                            />
                        ) : (
                            <DatePicker
                                renderInput={(params) => (
                                    <TextField {...params} />
                                )}
                                label="Set due date:"
                                type="date"
                                value={dueDate}
                                sx={{ width: 220 }}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onChange={(newDate) => {
                                    setDueDate(newDate);
                                }}
                                dateValue={dueDate}
                            />
                        )}
                        <FormControl sx={{ m: 1, minWidth: 120 }}>
                            <InputLabel id="demo-simple-select-helper-label">
                                Category
                            </InputLabel>
                            <Select
                                labelId="demo-simple-select-helper-label"
                                id="demo-simple-select-helper"
                                value={assignedCategory}
                                label="Category"
                                onChange={(event) =>
                                    setAssignedCategory(event.target.value)
                                }
                            >
                                <MenuItem defaultValue="" disabled>
                                    Category
                                </MenuItem>
                                {categories.map((category) => (
                                    <MenuItem
                                        key={category.value}
                                        value={category.label}
                                    >
                                        {category.label}
                                    </MenuItem>
                                ))}
                            </Select>
                            {/*{isUpdating &&*/}
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={isCompleted}
                                        onChange={handleChange}
                                        name="checkedG"
                                    />
                                }
                                label="Completed"
                            />
                            {/*}*/}
                        </FormControl>
                        {isCompleted ? (
                            <TextField
                                type={"number"}
                                id="outlined-required"
                                label="Grade: "
                                value={grade}
                                onChange={(e) => setGrade(e.target.value)}
                            />
                        ) : (
                            <></>
                        )}

                        {isCompleted && (
                            <DatePicker
                                renderInput={(params) => (
                                    <TextField {...params} />
                                )}
                                label="Completed Date:"
                                type="date"
                                value={completedDate}
                                sx={{ width: 220 }}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onChange={(newDate) => {
                                    setCompletedDate(newDate);
                                }}
                                date={completedDate}
                            />
                        )}
                        {/*{!isUpdating*/}
                        {/*      // ? <button className="btn">Add Assignment</button>*/}
                        <button className="btn">Update Assignment</button>
                        {/*}*/}
                    </Stack>
                </LocalizationProvider>
            </form>
        </div>
    );
};

export default ProjectUpdateForm;
