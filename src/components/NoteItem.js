import React from 'react'

const NoteItem = (props) => {
    const { note } = props;
    return (
        <div className="card col-md-3 mx-3 my-3">
            <div className="card-body">
                <div className="flex-d my-2">
                    <h5 className="card-title" style={{display:"inline"}}>{note.title}</h5>
                    <i class="fa-solid fa-trash mx-2"></i>
                    <i className="fa-solid fa-pen-to-square mx-2"></i>
                </div>
                <p className="card-text">{note.description}</p>
            </div>
        </div>
    )
}

export default NoteItem