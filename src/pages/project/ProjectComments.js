import React, { useState } from 'react';
import { timestamp } from "../../firebase/config";
import { useAuthContext} from "../../hooks/useAuthContext";
import {useFirestore} from "../../hooks/useFirestore";
import Avatar from "../../components/Avatar";
import { formatDistanceToNow } from '../../utils/dateUtils';
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useCollection } from '../../hooks/useCollection'
// import axios from "axios";
import {Stack, TextField} from "@mui/material";

const ProjectComments = ({project}) => {
    const { error, documents } = useCollection('users')
    const { user } = useAuthContext()
    const { updateDocument, response } = useFirestore('projects')
    // const { Url } = require('url');
    const [newComment, setNewComment] = useState('');
    // const [userEmail, setUserEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const axios = require('axios')
    const qs = require('qs')

    const accountSid = process.env.REACT_APP_TWILIO_ACCOUNT_SID;
    const authToken = process.env.REACT_APP_TWILIO_AUTH_TOKEN;
    // const twilio = require('twilio');
    // const client = twilio(accountSid, authToken);
    let textedUser = {}
    let testedUserDisplayName = ''


    const handleSubmit = async (e) => {
        e.preventDefault()
        const findTextedUser = (user) => {
            return user.phoneNumber === phoneNumber
        }

        if(documents) {
            textedUser = documents.find(findTextedUser)
        }
        if(textedUser){
            testedUserDisplayName = textedUser.displayName
        }

        const commentToAdd = {
            displayName: user.displayName,
            photoURL: user.photoURL,
            content: newComment,
            createdAt: timestamp.now().toDate(),
            id:timestamp.now().toString(),
            to: testedUserDisplayName
        }

        await updateDocument(project.id, {
            comments:[...project.comments, commentToAdd]
        })

        if (phoneNumber){
            // console.log("!!!!!!!!!! In Phone number", phoneNumber)
            const comment = `NaunaHomeSchool.com/projects/${project.id}: ${project.title}: ${newComment}    DO NOT REPLY!`
            await(axios.post("https://api.twilio.com/2010-04-01/Accounts/" + accountSid + "/Messages.json", qs.stringify({
              Body: comment,
              From: '+19106598410',
              To: phoneNumber
            }), {
              auth: {
                username: accountSid,
                password: authToken
              }
            }));
        }

        if (!response.error){
            setNewComment('')
            setPhoneNumber('')
        }
        setNewComment('')
        setPhoneNumber('')

    }
    return (
        <div className='project-comments'>
            <h4>Project Comments</h4>
            {error && <div className="error">{error}</div>}
            <form className="add-comment" id={'comment-form'} onSubmit={handleSubmit}>
                {/*<label>*/}
                {/*    <span>Add new Comment:</span>*/}
                {/*    <textarea*/}
                {/*        required*/}
                {/*        onChange={event => {setNewComment(event.target.value)}}*/}
                {/*        value={newComment}*/}
                {/*    />*/}
                {/*</label>*/}
                <Stack spacing={2} sx={{width: 'auto'}}>
                <TextField
                  id="outlined-textarea"
                  label="Add a comment or question: "
                  multiline
                  value={newComment}
                  onChange={text => setNewComment(text.target.value)}
               />
                <FormControl sx={{ mb: 1, minWidth: 250, color: "grey" }}>
                    <InputLabel id="demo-simple-select-helper-label">Text To:</InputLabel>
                        <Select
                          labelId="demo-simple-select-helper-label"
                          id="demo-simple-select-helper"
                          value={phoneNumber}
                          label="Category: *"
                          onChange={(event) => setPhoneNumber(event.target.value)}
                        >
                            {documents && documents.map(user => (
                                <MenuItem key={user.id}
                                   value={user.phoneNumber}>{user.displayName}</MenuItem>
                                )
                            )}
                        </Select>
                    </FormControl>
                <button className="btn mt-1">Add Comment</button>
                    </Stack>
            </form>

            <ul>
                {project.comments.length > 0 && project.comments.slice(0).reverse().map(comment => (
                    <li key={comment.id}>
                        <div className="comment-author">
                            <div className="author-container">
                                <Avatar src={comment.photoURL} />
                                <p>{comment.displayName}</p>
                            </div>
                            <div className="comment-content">
                                {comment.content}
                            </div>
                            <div className="comments-date">
                                <p>{formatDistanceToNow(comment.createdAt.toDate(), {addSuffix: true})}</p>
                                {comment.to && <p>Texted to {comment.to}</p>}
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProjectComments;