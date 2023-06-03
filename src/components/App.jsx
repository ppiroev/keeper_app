import React, { useState, useEffect } from "react";
import Heading from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import Create from "./Create";
import {
  collection,
  setDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase";

function App() {
  // Function to delete a note from the database
  async function deleteNoteDb(id) {
    await deleteDoc(doc(db, "notes", id));
  }

  // State to store the note items
  const [noteItems, setNoteItems] = useState([]);

  useEffect(() => {
    // Fetch notes from the database when the component mounts or when noteItems changes
    fetchNotesDb();
  }, []); // Removed noteItems dependency to prevent infinite loop

  // Function to add a note to the database
  async function addNoteDb(newNote) {
    try {
      await setDoc(doc(db, "notes", newNote.title), {
        title: newNote.title,
        content: newNote.content,
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  // Function to fetch notes from the database
  async function fetchNotesDb() {
    try {
      const querySnapshot = await getDocs(collection(db, "notes"));
      const data = querySnapshot.docs.map((note) => note.data());
      setNoteItems(data);
    } catch (e) {
      console.error("Error fetching notes: ", e);
    }
  }

  // Function to add a new note
  function addNote(newNote) {
    addNoteDb(newNote);
    fetchNotesDb();
  }

  // Function to delete a note
  function deleteNote(id) {
    deleteNoteDb(id);
    fetchNotesDb();
  }

  return (
    <div>
      <Heading />
      <Create onAdd={addNote} />
      {/* Render each note item */}
      {noteItems.map((note, index) => (
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
  );
}

export default App;