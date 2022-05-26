import NoteContext from "./NoteContext";
import { useState } from "react";

const NoteState = (props) => {
  const hostName = "http://localhost:5000"
  const [notes, setNotes] = useState([]);


  //fetch all notes
  const fetchNotes = async () => {
    const response = await fetch(hostName + '/api/notes/fetchallnotes', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': `${localStorage.getItem('token')}`
      }
    });
    const json = await response.json();

    setNotes(json);
  }

  //Add a note
  const addNote = async (obj) => {
    const response = await fetch(hostName + '/api/notes/addnote', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': `${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ title: obj.title, description: obj.description, tag: obj.tag })

    });
    const note = await response.json();
    setNotes(notes.concat(note));
  }
  //Delete a note
  const deleteNote = async (id) => {
    await fetch(hostName + `/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': `${localStorage.getItem('token')}`
      }
    });
    setNotes(notes.filter(note => note._id !== id));
    props.showAlert("success", "Deleted note successfully");

  }
  //Update a note
  const editNote = async (id, title, description, tag) => {
    await fetch(hostName + `/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': `${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ title, description, tag })

    });
    fetchNotes();
  }

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, fetchNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}
export default NoteState;