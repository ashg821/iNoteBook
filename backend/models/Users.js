const mongoose=require('mongoose');
// const {Schema}=mongoose;

const UserSchema=mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    timeStamp:{
        type: String,
        default: Date.now
    }
});
const users=mongoose.model('user', UserSchema);
module.exports=users;