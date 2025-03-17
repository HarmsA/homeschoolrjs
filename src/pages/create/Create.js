import React, {useState} from 'react';
import {LocalizationProvider} from "@mui/x-date-pickers";
import {DatePicker} from "@mui/x-date-pickers";
import { timestamp } from '../../firebase/config'
import { useAuthContext } from '../../hooks/useAuthContext'
import { Stack, TextField } from "@mui/material"
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { useFirestore } from '../../hooks/useFirestore'
import { useNavigate } from 'react-router-dom'

export const categories = [
    {value: 'art', label:'Art'},
    {value: 'bible', label:'Bible'},
    {value: 'composition', label: 'Composition'},
    {value: 'cultural_conversations', label:'Culture Conversations'},
    {value: 'family_and_consumer_science', label:'Family and Consumer Science'},
    {value: 'foreign_language', label: 'Foreign Language' },
    {value: 'computer_science', label:'Computer Science'},
    {value: 'general', label:'General'},
    {value: 'grammar', label:'Grammar'},
    {value: 'health', label:'Health'},
    {value: 'history', label:'History'},
    {value: 'literature', label:'Literature'},
    {value: 'math', label:'Math'},
    {value: 'music', label:'Music'},
    {value: 'science', label:'Science'},
    {value: 'spelling', label:'Spelling'},
    {value: 'vocabulary', label:'Vocabulary'},
];

const Create = () => {
    const { user } = useAuthContext()
    const navigate = useNavigate()
    const { addDocument, response } = useFirestore('projects')
    const [title, setTitle] = useState('');
    const [assignmentDetails, setAssignmentDetails] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [liveDate, setLiveDate] = useState('');
    const [assignedCategory, setAssignedCategory] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(null)
        if (!title){
            setError('Title Field Required')
            return
        }
        if (!assignmentDetails){
            setError('Assignment Field Required')
            return
        }
        if (!dueDate){
            setError('Due Date Field Required')
            return
        }
        if (!assignedCategory){
            setError('Category Field Required')
            return
        }
        const createdBy = {
            displayName: user.displayName,
            photoURL: user.photoURL,
            id: user.uid
        }
        const project = {
          title,
          details: assignmentDetails,
          category: assignedCategory,
          dueDate: timestamp.fromDate(dueDate), //Corrected line
          liveDate: timestamp.fromDate(liveDate), //Corrected line
          completedDate: "",
          comments: [],
          completed: false,
          createdBy,
          grade: null,
        };
        await addDocument(project)
        if (!response.error) {
              navigate('/')
        }
    }

    return (
      <div className="create-form">
        <h2 className="page-title">Create Assignment</h2>
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
                onChange={(text) => setAssignmentDetails(text.target.value)}
              />
              <DatePicker
                renderInput={(params) => <TextField {...params} />}
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
                date={null}
              />
              <DatePicker
                renderInput={(params) => <TextField {...params} />}
                label="Set assignment live date:"
                type="date"
                value={liveDate}
                sx={{ width: 220 }}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(newDate) => {
                  setLiveDate(newDate);
                }}
                date={null}
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
                  onChange={(event) => setAssignedCategory(event.target.value)}
                >
                  <MenuItem defaultValue="" disabled>
                    Category
                  </MenuItem>
                  {categories.map((category) => (
                    <MenuItem key={category.value} value={category.label}>
                      {category.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <button className="btn">Add Assignment</button>
            </Stack>
          </LocalizationProvider>
        </form>
      </div>
    );
};

export default Create;