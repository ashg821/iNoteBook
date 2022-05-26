import React, {useContext} from 'react'
import noteContext from '../context/notes/NoteContext';

const NoteItem = (props) => {
    const { note, updateNote } = props;
    const context = useContext(noteContext);
    const { deleteNote } = context;
    return (
        <div className="card col-md-3 mx-3 my-3">
            <div className="card-body">
                <div className="my-2" style={{ display: "flex", justifyContent: "space-between" }}>
                    <h5 className="card-title" style={{ display: "inline" }}>{note.title}</h5>
                    <div>
                        <i className="fa-solid fa-trash mx-2" onClick={()=>deleteNote(note._id)}></i>
                        <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>updateNote(note)}></i>
                    </div>
                </div>
                <p className="card-text">{note.description}</p>
            </div>
        </div>
    )
}

export default NoteItem