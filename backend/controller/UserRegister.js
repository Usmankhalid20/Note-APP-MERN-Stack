const User = require('../Models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

const Register = async(req, res) => {
    try {
        const {name, email, password} = req.body;
        if(!name || !email || !password) {
            return res.status(400).json({message: "Please fill all the fields"});
        } 
        const users = await User.findOne({ email });
        if(users) {
            return res.status(400).json({success: false, message: "User already exists"});
        }
        const HashUserPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            email,
            password: HashUserPassword
       
        });
        await user.save();
        return res.status(201).json({success: true, user, message: "User created successfully"});   
        
    } catch (error) {
        return res.status(201).json({success: true, message: "Error in Adding User"});
    }
}

const Login = async(req, res) => {
 try {
        const {email, password} = req.body;
        console.log(email, password, "email and password");
        console.log(req.body)
        if(!email || !password) {
            return res.status(400).json({message: "Please fill all the fields"});
        } 
        const users = await User.findOne({ email });
        console.log(users, "users data ");
        if(!users) {
            return res.status(400).json({ success: false, message: "User not found" });
        }
        const checkUserPassword = await bcrypt.compare(password, users.password);
        if(!checkUserPassword) {
            return res.status(400).json({success: false, message: "Invalid Password"});
        } 
        // return res.status(201).json({success: true, message: "User Login successfully"});

       const token = jwt.sign({ id: users._id }, process.env.JWT_SECRET, { expiresIn: '10h' });

       return res.status(200).json({
      success: true,
      message: "User Login successfully",
      token,
      User: {   
        name: users.name,
      }
    });

    } catch (error) {
        return res.status(201).json({success: true, message: "Error in Adding User"});
    }
}

module.exports = {Register, Login}