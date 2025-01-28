import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import validator from "validator"


const createToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET)
}


// login user 
const loginUser = async(req, res) =>{
    const {email, password} = req.body

    try {
        const user = await userModel.findOne({email})

        if (!user){
            return res.json({success:false, message:"User doesn't exist"})
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch){
            return res.json({success:false, message:"Incorrect credentials"})
        }

        const token = createToken(user._id)
        res.json({success:true, token, message:"Logged in Successfully"})

    } catch(error) {
        res.json({success:false, message:"Error in creating account"})
    }
}

// register user 
const registerUser = async(req, res) =>{
    const {name, password, email} = req.body
    try {
        const exists = await userModel.findOne({email})
        if (exists){
            return res.json({success:false, message:"User already registered"})
        }

        if (!validator.isEmail(email)){
            return res.json({success:false, message:"Incorrect email address"})
        }

        if (password.length<10){
            return res.json({success:false, message:"Password length should be more than 10 characters"})
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new userModel({
            name:name,
            email:email,
            password:hashedPassword
        })

        const user = await newUser.save()
        const token = createToken(user._id)
        res.json({success:true, token})

    } catch (error){
        res.json({success:false, message:"Error in user registration"})
    }
}


export {loginUser, registerUser}