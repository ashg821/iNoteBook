const mongoose=require('mongoose');
// const {Schema}=mongoose;

const NotesSchema=mongoose.Schema({
    user: {
        //its like concept of foreign key in SQL
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
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
const notes=mongoose.model('notes', NotesSchema);

module.exports=notes;