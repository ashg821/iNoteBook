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
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI4OGRjMGMwMTU4MDhhOWY3NjQwNjdlIn0sImlhdCI6MTY1MzIwMjMxOH0.3FfJm5usiTvp-6mrvkYojyaC4Jo4oVZ7pdqCVcvpYxo'
      }
    });
    const json=await response.json();
    
    setNotes(json);
  }

  //Add a note
  const addNote = async (obj) => {
    const response=await fetch(hostName+'/api/notes/addnote', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI4OGRjMGMwMTU4MDhhOWY3NjQwNjdlIn0sImlhdCI6MTY1MzIwMjMxOH0.3FfJm5usiTvp-6mrvkYojyaC4Jo4oVZ7pdqCVcvpYxo'
      },
      body: JSON.stringify({title: obj.title, description: obj.description, tag: obj.tag})

    });
    const note=await response.json();
    setNotes(notes.concat(note));
  }

  //Delete a note
  const deleteNote = async (id) => {
    await fetch(hostName+`/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI4OGRjMGMwMTU4MDhhOWY3NjQwNjdlIn0sImlhdCI6MTY1MzIwMjMxOH0.3FfJm5usiTvp-6mrvkYojyaC4Jo4oVZ7pdqCVcvpYxo'
      }
    });
    setNotes(notes.filter(note => note._id !== id));
  }

  //Update a note
  const editNote = async (id, title, description, tag) => {
    let note;
    const response=await fetch(hostName+`/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI4OGRjMGMwMTU4MDhhOWY3NjQwNjdlIn0sImlhdCI6MTY1MzIwMjMxOH0.3FfJm5usiTvp-6mrvkYojyaC4Jo4oVZ7pdqCVcvpYxo'
      },
      body: JSON.stringify({title, description, tag})
      
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