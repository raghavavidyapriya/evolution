import userModel from "../models/userModel.js"

const addToCart = async(req, res) =>{
    try {
        let userData = await userModel.findById({_id:req.body.userId})
        let cartData = await userData.cartData;
        if (!cartData[req.body.itemId]){
            cartData[req.body.itemId] = 1
        } else {
            cartData[req.body.itemId] += 1
        }
        await userModel.findByIdAndUpdate(req.body.userId, {cartData})
        res.json({success:true, message:"Accessory added to your cart"})
    } catch (error) {
        res.json({success:false, message:"Error adding accessory to your cart"})
    }
}

const removeFromCart = async(req, res) =>{
    try {
        let userData = await userModel.findById(req.body.userId)
        let cartData = await userData.cartData;
        if (cartData[req.body.itemId]>0){
            cartData[req.body.itemId] -= 1
        } 
        await userModel.findByIdAndUpdate(req.body.userId, {cartData})
        res.json({success:true, message:"Accessory removed from your cart"})
    } catch (error) {
        res.json({success:false, message:"Error removing accessory from your cart"})
    }
}

const getCart = async(req, res) =>{
    try {
        let userData = await userModel.findById(req.body.userId).sort({quantity:1})
        let cartData = await userData.cartData;
        res.json({success:true, cartData})
    } catch (error){
        res.json({success:false, message:"Error in retrieving cart data"})
    }
}

export {addToCart, removeFromCart, getCart}