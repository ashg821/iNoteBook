import React, {useContext} from 'react'
import noteContext from '../context/notes/NoteContext';
import NoteItem from './NoteItem';

function Notes() {
    const context=useContext(noteContext);
    const notes=context.state;
  return (
    <div className="container my-3">
      <h2 style={{textAlign:"center"}}>Your notes</h2>
      <div className='row' style={{justifyContent:"center"}}>{notes.map(note=>{
          return <NoteItem note={note}/>
      })}</div>
    </div>
  )
}

export default Notes