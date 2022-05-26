import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import noteContext from '../context/notes/NoteContext';
import AddNote from './AddNote';
import NoteItem from './NoteItem';

function Notes(props) {
  const context = useContext(noteContext);
  const { notes, fetchNotes, editNote } = context;
  const ref = useRef(null);
  const closeRef = useRef(null);

  const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "default" });
  let navigate=useNavigate();


  useEffect(() => {
    if(localStorage.getItem('token')) fetchNotes();
    else navigate("/login");

    // eslint-disable-next-line
  }, [])


  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag });
  }

  const handleClick = (e) => {
    editNote(note.id, note.etitle, note.edescription, note.etag);
    closeRef.current.click();
    props.showAlert("success", "Details updated successfully");


  }
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  }

  return (
    <>
      <AddNote showAlert={props.showAlert} />
      <button ref={ref} style={{ display: 'none' }} type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
              <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">Title</label>
                  <input type="text" className="form-control" id="etitle" name="etitle" aria-describedby="emailHelp" onChange={onChange} value={note.etitle} />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">Description</label>
                  <input type="text" className="form-control" id="edescription" name="edescription" onChange={onChange} value={note.edescription} />
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">Tag</label>
                  <input type="text" className="form-control" id="etag" name="etag" onChange={onChange} value={note.etag} />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button ref={closeRef} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button disabled={!(note.etitle.length >= 3 && note.edescription.length >= 5)} type="button" className="btn btn-primary" onClick={handleClick}>Update Note</button>
            </div>
          </div>
        </div>
      </div>
      <div className="container my-3">
        <h2 style={{ textAlign: "center" }}>Your notes</h2>
        {notes.length === 0 && "No notes to display"}
        <div className='row container' style={{ justifyContent: "center" }}>{notes.map(note => {
          return <NoteItem note={note} key={note._id} updateNote={updateNote} />
        })}</div>
      </div>
    </>
  )
}

export default Notes