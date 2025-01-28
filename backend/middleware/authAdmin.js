import jwt from "jsonwebtoken"

const authAdminMiddleware = async(req, res, next) => {
    const {token} = req.headers;
    if (!token){
        return res.json({success:false, message:"Login again"})
    }
    try {
        const token_decode = jwt.verify(token, process.env.ADMIN_JWT_SECRET)
        if (token_decode){
            next()
        } else {
            return res.json({success:false, message:"Invalid session"})
        }
    } catch (error) {
        return res.json({success:false, message:"Session expired"})
    }
}

export default authAdminMiddleware