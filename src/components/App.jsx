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
  async function deleteNoteDb(id) {
    await deleteDoc(doc(db, "notes", id));
  }

  const [noteItems, setNoteItems] = useState([]);

  useEffect(() => {
    fetchNotesDb();
  }, [noteItems]);

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

  async function fetchNotesDb() {
    await getDocs(collection(db, "notes")).then((querySnapshot) => {
      const data = querySnapshot.docs.map((note) => note.data());
      setNoteItems(data);
    });
  }

  function addNote(newNote) {
    addNoteDb(newNote);
    fetchNotesDb();
  }

  function deleteNote(id) {
    deleteNoteDb(id);
    fetchNotesDb();
  }

  return (
    <div>
      <Heading />
      <Create onAdd={addNote} />
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
