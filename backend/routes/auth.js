const express = require('express');
const router = express.Router();
const users = require('../models/Users');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = "coolkid";
const fetchuser=require('../middleware/fetchuser');

//Route 1: localhost/api/auth/createuser, creates a new user and saves the details in the DB
router.post('/createuser', [
    //express-validator checks for name email and password
    body('name', 'Name should contain atleast 3 characters').isLength({ min: 3 }),
    body('email', 'Invalid email format').isEmail(),
    body('password', 'password should atleast 5 charcters').isLength({ min: 5 })
], async (req, res) => {
    const errors = validationResult(req);
    //if there is any error with the validation check then error response is being displayed
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        let user = await users.findOne({ email: req.body.email });
        //is entered email is already taken by a user in the DB, then error is shown
        if (user) return res.status(400).json({ error: "user with the same email id already exists" });
        //if all is okay than user with the entered credentials in registered in the database

        const salt = await bcrypt.genSalt(10);
        const encryptedPass = await bcrypt.hash(req.body.password, salt);

        user = await users.create({
            name: req.body.name,
            email: req.body.email,
            password: encryptedPass
        })
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);

        res.json({ authToken });
        // res.json(user);
    } catch (error) {
        res.status(500).send("Internal server error occured");
    }

    // .then(user => {
    //     console.log(user);
    //     res.json(user);

    // }).catch(err=>{
    //     // console.log(err);
    //     res.json({error: 'Please enter a unique value for email', message: err.message})
    // });
});
//Route 2: localhost/api/auth/login, validates a user by email and password
router.post('/login', [
    body('email', 'Invalid email format').isEmail(),
    body('password', 'Name should contain atleast 3 characters').exists(),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    const { email, password } = req.body;
    try {
        let user = await users.findOne({ email });
        if (!user) return res.status(400).json({ error: "Please try to login with correct credentials." });

        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) return res.status(400).json({ error: "Please try to login with correct credentials." });

        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);

        res.json({ authToken });
    } catch (error) {
        res.status(500).send("Internal server error occured");
    }

});
//Route 3: localhost/api/auth/getdata, login reguired, gets id from the JWT token and fetches data using the id in the JWT token after verifying, also a middleware function is used to get the ID in the token
//login is reuired
router.post("/getdata",fetchuser, async (req, res)=>{
    try {
        const userId=req.user.id;
        let user= await users.findById(userId).select("-password");
        res.json(user);
        
    } catch (error) {
        res.status(500).send("Internal server error occured");
    }
});

module.exports = router;