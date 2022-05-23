const express = require('express');
const router = express.Router();
const notes = require('../models/Notes');
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');
const { findByIdAndUpdate } = require('../models/Notes');

//Route 1: localhost/api/notes/fetchallnotes, creates a new user and saves the details in the DB
router.get('/fetchallnotes', fetchuser, async (req, res) => {    
    try {
        const note = await notes.find({user: req.user.id});
        res.json(note);
    } catch (error) {
        res.status(500).send("Internal server error occured");
    }
});

//Route 2: localhost/api/notes/addnote, add a note to the note DB, and login is required for this
router.post('/addnote', fetchuser, fetchuser, [
    //express-validator checks for name email and password
    body('title', 'Name should contain atleast 3 characters').isLength({ min: 3 }),
    body('description', 'Description should atleast 5 charcters').isLength({ min: 5 })
],async (req, res)=>{
    const errors = validationResult(req);
    //if there is any error with the validation check then error response is being displayed
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    try {
        const {title, description, tag}=req.body;
        const note=new notes({user: req.user.id, title, description, tag});
        const savedNote=await note.save();
        res.json(savedNote);
    } catch (error) {
        res.status(500).send("Internal server error occured");
    }

});

//Route 3: localhost/api/notes/updatenote/:id, update a note in the note DB, and login is required for this as well
router.put('/updatenote/:id', fetchuser, async (req, res)=>{
    try{
        const {title, description, tag}=req.body;
        //creating a new note obj to keep the input values of the updated note
        const newNote={};
        if(title) newNote.title=title;
        if(description) newNote.description=description;
        if(tag) newNote.tag=tag;
    
        //finding the note to be updated, and if no such note is found than displaying the message for that
        let note= await notes.findById(req.params.id);
        if(!note) return res.status(404).send("Note not found.");
    
        //if the id of the updater doesnt match the ID of the id of the logger then access should be denied
        if(note.user.toString()!==req.user.id) return res.status(401).send("Not allowed");
    
        //after all checks the note is updated 
        note=await notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true});
        res.json(note);
    }catch (error) {
        res.status(500).send("Internal server error occured");
    }
});

//Route 4: localhost/api/notes/deletenote/:id, delete a note from the note DB, and login is required for this as well
router.delete('/deletenote/:id', fetchuser, async (req, res)=>{
    try{
        //finding the note to be deleted, and if no such note is found than displaying the message for that
        let note= await notes.findById(req.params.id);
        if(!note) return res.status(404).send("Note not found.");
    
        //if the id of the deleter doesnt match the ID of the logger then access should be denied
        if(note.user.toString()!==req.user.id) return res.status(401).send("Not allowed");
    
        await notes.findByIdAndRemove(req.params.id);
        res.send("Note deleted");
    }catch (error) {
        res.status(500).send("Internal server error occured");
    }
});

module.exports = router;