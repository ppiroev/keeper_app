import React, {useState} from "react";
import Heading from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import Create from "./Create";


function App() {

    const [noteItems, setNoteItems] = useState([]);

    function addNote(newNote){
        setNoteItems(prevItems => {
            return [newNote, ...prevItems]
        })
    }

    function deleteNote(id){
        setNoteItems(prevItems =>{
            return prevItems.filter((item, index) => {
               return index !== id; 
            })
        })

    }

    return (
        <div>
            <Heading />
            <Create 
                onAdd={addNote}
            />
            {noteItems.map((note, index )=> (
                <Note
                    key={index}
                    id={index}
                    title={note.title}
                    content={note.content}
                    onDelete={deleteNote}
            />
            ))}
            <Footer />
        </div>
    )
};

export default App;