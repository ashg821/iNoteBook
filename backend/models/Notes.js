const mongoose=require('mongoose');

const NotesSchema=mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true,
        unique: true
    },
    tag:{
        type: String,
        default: 'General'
    },
    timeStamp:{
        type: String,
        default: Date.now
    }
});
module.exports=mongoose.model('notes', NotesSchema);