const express=require('express');
const router=express.Router();
const users=require('../models/Users');

router.post('/', (req, res)=>{
    console.log(req.body);
    const user=new users(req.body);
    user.save();
    res.send(req.body);
});

module.exports=router;