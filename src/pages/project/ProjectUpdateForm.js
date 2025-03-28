import React, { useState } from "react";
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';


// import { CustomDateAdapter } from "../../utils/dateUtils";
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
    onCancel,
}) => {
    // const { user } = useAuthContext()
    const navigate = useNavigate();
    const { updateDocument, response } = useFirestore("projects");
    const [title, setTitle] = useState(docTitle);
    const [assignmentDetails, setAssignmentDetails] =
    useState(docAssignmentDetails);
    const [dueDate, setDueDate] = useState(docDueDate ? docDueDate.toDate() : new Date());
    const [assignedCategory, setAssignedCategory] =
    useState(docAssignedCategory);
    const [error, setError] = useState(null);
    const [isCompleted, setIsCompleted] = useState(docCompleted);
    const [grade, setGrade] = useState(docGrade || "");
    const [completedDate, setCompletedDate] = useState(
        docCompletedDate ? docCompletedDate.toDate() : new Date()
    );

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
            setError("Assignment Details Field Required");
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

        // Updating document
        const projectToUpdate = {
            title,
            details: assignmentDetails,
            category: assignedCategory,
            completed: isCompleted,
            dueDate: timestamp.fromDate(new Date(dueDate)),
            grade: grade ? Number(grade) : null,
            completedDate: isCompleted ? timestamp.fromDate(new Date(completedDate)) : null,
        };

        if (!isCompleted && grade) {
            setError(
                "Please check assignment completed when a grade is entered.",
            );
            return;
        }

        if (grade && (Number(grade) < 0 || Number(grade) > 100)) {
            setError("Grade must be between 0-100.");
            return;
        }

        try {
            await updateDocument(projectId, projectToUpdate);
            if (!response.error) {
                onCancel(); // Go back to view mode instead of navigating away
            }
        } catch (err) {
            setError("Failed to update project: " + err.message);
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
                <LocalizationProvider dateAdapter={AdapterDateFns}>
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
                            value={assignmentDetails}
                            onChange={(text) =>
                                setAssignmentDetails(text.target.value)
                            }
                        />
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
                        />
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
                            />
                        )}
                        <div className="button-container">
                            <button type="button" className="btn" onClick={onCancel}>
                                Cancel
                            </button>
                            <button type="submit" className="btn">
                                Update Assignment
                            </button>
                        </div>
                    </Stack>
                </LocalizationProvider>
            </form>
        </div>
    );
};

export default ProjectUpdateForm;
