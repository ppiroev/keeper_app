import React, {useState} from "react";
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import Zoom from '@mui/material/Zoom';


function Create(props){

    const [newNote, setNewNote] = useState({
        title: "",
        content: "",
    });

    const [isZoomed, setZoomed] = useState(false)

    function handleChange(event){
        const {value, name} = event.target

        setNewNote(prevValue => {
            if (name === "title"){
            return {
                title: value,
                content: prevValue.content

        }
        } else if (name === "content") {
            return {
                title: prevValue.title,
                content: value
            }
        }
        })
    }

    function handleClick(){
        setZoomed(true);
    }

    const stopRefresh = event =>{
        event.preventDefault();
        setNewNote({
        title: "",
        content: ""
        })
    }
    

    return(
        <div>
            <form className="create-note" onSubmit={stopRefresh}>
                {isZoomed ? <input onChange={handleChange} name="title" placeholder="Title" value={newNote.title}/> : null}
                <textarea onClick={handleClick} onChange={handleChange} name="content" placeholder="Take a note..." rows={isZoomed ? 3 : 1} value={newNote.content}/>
                <Zoom in={isZoomed}>
                <Fab type="submit" onClick={()=>
                props.onAdd(newNote)}>
                <AddIcon />
                </Fab>
                </Zoom>
            </form>
        </div>
    )
};

export default Create;