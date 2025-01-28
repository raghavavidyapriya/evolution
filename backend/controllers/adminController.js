import jwt from "jsonwebtoken"
import dotenv from 'dotenv';
dotenv.config();

const createToken = (email) => {
    return jwt.sign({email},process.env.ADMIN_JWT_SECRET)
}

const loginAdmin = async(req, res) =>{
    const {email, password} = req.body

    let admin_username = process.env.ADMIN_USERNAME
    let admin_password = process.env.ADMIN_PASSWORD

    try {
        if (!((email === admin_username) && (password===admin_password))){
            return res.json({success:false, message:"Invalid credentials"})
        } else {
            const token = createToken(email)
            res.json({success:true, token, message:"Admin logged in successfully"})
        }

    } catch(error) {
        res.json({success:false, message:"Error in admin validation"})
    }
}

export {loginAdmin}