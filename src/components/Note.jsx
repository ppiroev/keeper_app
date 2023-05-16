import React from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import Fab from '@mui/material/Fab';

function Note(props){
    return  <div className="note">
                <h1>{props.title}</h1>
                <p>{props.content}</p>
                <Fab className="deleteButton" onClick={() => {props.onDelete(props.id)}}>
                <DeleteIcon />
                </Fab>
            </div>
};

export default Note;