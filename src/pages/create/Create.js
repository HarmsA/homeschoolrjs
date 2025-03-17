import React, {useState} from 'react';
// import styles from './Create.module.css'
import {LocalizationProvider} from "@mui/x-date-pickers";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import {DatePicker} from "@mui/x-date-pickers";
import { timestamp } from '../../firebase/config'
import { useAuthContext } from '../../hooks/useAuthContext'
import { Stack, TextField } from "@mui/material"
import Select from '@mui/material/Select';
// import Checkbox from '@material-ui/core/Checkbox';
// import Checkbox from '@mui/material/Checkbox';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
// import { useCollection } from '../../hooks/useCollection'
import { useFirestore } from '../../hooks/useFirestore'
import { useHistory } from 'react-router-dom'

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
]

const Create = () => {
    const { user } = useAuthContext()
    const history = useHistory()
    const { addDocument, response } = useFirestore('projects')
    const [title, setTitle] = useState('');
    const [assignmentDetails, setAssignmentDetails] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [liveDate, setLiveDate] = useState('');
    const [assignedCategory, setAssignedCategory] = useState('');
    const [error, setError] = useState(null);
    // const isUpdating = props.isUpdating;
    // const [isCompleted, setIsCompleted] = useState(props.completed);
    // const [grade, setGrade] = useState(false);
    // const today = new Date()

    // const handleChange = (event) => {
    //     setIsCompleted( event.target.checked );
    // };

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
        // Create Document
        // if (!isUpdating){
         const project = {
           title,
           details: assignmentDetails,
           category: assignedCategory,
           dueDate: timestamp.fromDate(new Date(dueDate)),
           liveDate: timestamp.fromDate(new Date(liveDate)),
           completedDate: "",
           comments: [],
           completed: false,
           createdBy,
           grade: null,
         };
        await addDocument(project)
        if (!response.error) {
            history.push('/')
        }
        // }

        // Updating document
        // if(isUpdating){
        //     const projectToUpdate = {
        //         title,
        //         details: assignmentDetails,
        //         category: assignedCategory,
        //         completed: isCompleted,
        //         dueDate: timestamp.fromDate(new Date(dueDate)),
        //         grade: grade,
        //
        //     }
        //
        //     if (isCompleted && !grade){
        //         setError('If an assignment is completed a grade must be entered.')
        //         return
        //     }
        //     if (!isCompleted && grade){
        //         setError('Please check assignment completed when a grade is entered.')
        //         return
        //     }
        //     if (grade) {
        //         if (Number(grade) >= 0 && Number(grade) <= 100) {
        //             await updateDocument(props.project.id, {
        //                 grade: Number(grade),
        //             })
        //         }else{
        //             setError('Grade must be between 0-100.')
        //             return
        //         }
        //     }
        //
        //     if (!props.project.completedDate) {
        //         await updateDocument(props.project.id, {
        //             completedDate: timestamp.fromDate(new Date(today)),
        //         })
        //     }
        //     if (props.project.title !== projectToUpdate.title) {
        //         await updateDocument(props.project.id, {
        //             title: projectToUpdate.title,
        //         })
        //     }
        //
        //     if (props.project.details !== projectToUpdate.details) {
        //         await updateDocument(props.project.id, {
        //             details: assignmentDetails,
        //         })
        //     }
        //     if (props.project.category !== projectToUpdate.category) {
        //         await updateDocument(props.project.id, {
        //             category: projectToUpdate.category,
        //         })
        //     }
        //     if (props.project.completed !== projectToUpdate.completed) {
        //         await updateDocument(props.project.id, {
        //             completed: projectToUpdate.completed,
        //         })
        //     }
        //
        //     if (props.project.dueDate !== projectToUpdate.category) {
        //         await updateDocument(props.project.id, {
        //             dueDate: timestamp.fromDate(new Date(dueDate)),
        //         })
        //     if (!response.error) {
        //         history.push('/')
        //     }
        //     }
        // }
    }

    return (
      <div className="create-form">
        <h2 className="page-title">Create Assignment</h2>
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
                defaultValue={assignmentDetails}
                onChange={(text) => setAssignmentDetails(text.target.value)}
              />
              {/*{dueDate*/}
              {/*    ? <DatePicker*/}
              {/*        renderInput={(params) => <TextField {...params}/>}*/}
              {/*        label="Set due date:"*/}
              {/*        type="date"*/}
              {/*        value={dueDate}*/}
              {/*        sx={{width: 220}}*/}
              {/*        InputLabelProps={{*/}
              {/*            shrink: true,*/}
              {/*        }}*/}
              {/*        onChange={(newDate) => {*/}
              {/*            setDueDate(newDate)*/}
              {/*        }}*/}
              {/*        date={null}*/}
              {/*    />*/}
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
              {/*}*/}
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
                {/*{isUpdating &&*/}
                {/*    <FormControlLabel*/}
                {/*        control={*/}
                {/*            <Checkbox*/}
                {/*            checked={isCompleted}*/}
                {/*            onChange={handleChange}*/}
                {/*            name="checkedG"*/}
                {/*            />*/}
                {/*        }*/}
                {/*        label="Completed"*/}
                {/*        />*/}
                {/*}*/}
                {/*    {isUpdating &&*/}
                {/*        <TextField*/}
                {/*            type={'number'}*/}
                {/*          id="outlined-required"*/}
                {/*          label="Grade: "*/}
                {/*          value={grade}*/}
                {/*          onChange={(e) => setGrade(e.target.value)}*/}
                {/*/>*/}
                {/*    }*/}
              </FormControl>
              {/*{!isUpdating*/}
              <button className="btn">Add Assignment</button>
              {/*: <button className="btn">Update Assignment</button>*/}
              {/*}*/}
            </Stack>
          </LocalizationProvider>
        </form>
      </div>
    );
};

export default Create;