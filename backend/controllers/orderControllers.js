import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js"
import Stripe from "stripe"
import dotenv from 'dotenv';
dotenv.config();


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const placeOrder = async(req, res) => {

    const frontend_url = process.env.FRONTEND_URL
    try {
        const newOrder = new orderModel({
            userId:req.body.userId,
            items:req.body.items,
            address:req.body.address,
            amount:req.body.amount
        })
        await newOrder.save()
        await userModel.findByIdAndUpdate(req.body.userId, {cartData:{}})

        const line_items = req.body.items.map((item)=>({
            price_data: {
                currency:"inr",
                product_data: {
                    name:item.name
                },
                unit_amount:item.price*100
            },
            quantity:item.quantity
        }))

        line_items.push({
            price_data: {
                currency:"inr",
                product_data: {
                    name:"delivery chargers"
                },
                unit_amount: 499*100
            },
            quantity: 1
        })

        const session = await stripe.checkout.sessions.create({
            line_items:line_items,
            mode:"payment",
            success_url:`${frontend_url}verify?success=true&orderId=${newOrder._id}`,
            cancel_url:`${frontend_url}verify?success=false&orderId=${newOrder._id}`,
        })
        res.json({success:true, session_url:session.url})
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error})
    }
}

const verifyOrder = async(req, res) => {
    const success = req.body.success
    const orderId = req.body.orderId

    try {
        if (success){
            await orderModel.findByIdAndUpdate(orderId, {payment: true})
            res.json({success:true, message:"Payment successful"})
        } else {
            await orderModel.findByIdAndDelete(orderId)
            res.json({success:false, message:"Payment unsuccessful"})
        }
    } catch (error) {
        res.json({success:false, message:"Error in payment"})

    }
}

const userOrder = async(req, res) => {
    try {
        const orders = await orderModel.find({userId: req.body.userId}).sort({ date: -1 })
        res.json({success:true, data:orders})
    } catch (error){
        res.json({success:false, message:"Cart empty"})
    }
}

const listOrders = async(req, res) => {
    try {
        const orders = await orderModel.find({}).sort({ date: -1 });
        res.json({success:true, data:orders})
    } catch (error){
        res.json({success:false, message:"Error fetching orders"})
    }
}

const updateStatus = async(req, res) => {
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId, {status:req.body.status})
        res.json({success:true, message:"Status updated"})
    } catch (error){
        res.json({success:false, message:"Error updating status"})
    }
}



export {placeOrder, verifyOrder, userOrder, listOrders, updateStatus}
