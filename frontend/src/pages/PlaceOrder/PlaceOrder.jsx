import React, { useContext, useState, useEffect } from 'react'
import "./PlaceOrder.css"
import { StoreContext } from '../../context/StoreContext'
import axios from "axios"
import {toast} from "react-toastify"
import {useNavigate}from "react-router-dom"


const PlaceOrder = () => {

    const navigate = useNavigate()
    const {getTotalCartAmount, token, cars_list, cartItems, url} = useContext(StoreContext)
    
    const [data, setData] = useState({
        firstName:"",
        lastName:"",
        phoneNumber:"",
        building:"",
        street:"",
        landMark:"",
        city:"",
        state:"",
        pincode:"",
        email:"",
    })

    const onChangeHandler = (event) => {
        const name = event.target.name
        const value = event.target.value
        setData(prevData=>({...prevData,[name]:value}))
    }

    const placeOrder  = async(event) => {
        event.preventDefault()
        let orderItems = []
        cars_list.map((item)=>{
            if (cartItems[item._id]>0){
                let itemInfo = item
                itemInfo["quantity"] = cartItems[item._id]
                orderItems.push(itemInfo)
            }
        })

        let orderData = {
            address:JSON.stringify(data),
            items: orderItems,
            amount: getTotalCartAmount()+499,
        }

        let response = await axios.post(url+"/api/order/place", orderData, {headers:{token}})
        if (response.data.success){
            const {session_url} = response.data
            window.location.replace(session_url)
        } else{
            toast.error("Error in payment")
        }
    }

    useEffect(()=>{
        if (!token){
            navigate("/cart")
            toast.error("Login to your account")        
        } 
    }, [token])


    return (
        <form onSubmit={placeOrder} className='place-order'>
            <div className='place-order-left'>
                <p className="title">Delivery Information</p>
                <div className="multi-fields">
                    <input name="firstName" onChange={onChangeHandler} value={data.firstName} required type='text' placeholder=' First name'/>
                    <input name="lastName" onChange={onChangeHandler} value={data.lastName} type='text' placeholder='Last name'/>
                </div>
                <input name="phoneNumber" onChange={onChangeHandler} value={data.phoneNumber} required type='text' placeholder='Phone number'/>
                <div className="multi-fields">                
                    <input name="building" onChange={onChangeHandler} value={data.building}  required type='text' placeholder='Building'/>
                    <input name="street" onChange={onChangeHandler} value={data.street} required type='text' placeholder='Street'/>
                </div>
                <div className="multi-fields">
                    <input name="landMark" onChange={onChangeHandler} value={data.landMark} required type='text' placeholder='Landmark'/>
                    <input name="city" onChange={onChangeHandler} value={data.city} required type='text' placeholder='City'/>
                </div>
                <div className="multi-fields">
                    <input name="state" onChange={onChangeHandler} value={data.state} required type='text' placeholder='State'/>
                    <input name="pincode" onChange={onChangeHandler} value={data.pincode} required type='text' placeholder='Pincode'/>
                </div>
                <div  className="email-phno">
                    <input name="email" onChange={onChangeHandler} value={data.email} required type='email' placeholder='Email'/>
                </div>
            </div>
            <div className="place-order-right">
                <div className='cart-total'>
                    <p className='cart-total-title'>Cart Total</p>
                    <div>
                        <div className='cart-total-details'>
                            <p>Subtotal</p>
                            <p>&#8377; {getTotalCartAmount().toLocaleString()}</p>
                        </div>
                        <div className='cart-total-details'>
                            <p>Delivery Fee</p>
                            <p>&#8377; {getTotalCartAmount()?499:"0"}</p>
                        </div>
                        <div className='cart-total-details'>
                            <b>Total</b>
                            <b>&#8377; {(getTotalCartAmount()?getTotalCartAmount()+499:"0").toLocaleString()}</b>
                        </div>
                    </div>
                    <button type='submit' className='place-order-button'>PAYMENT</button>
                    <p className='placeorder-card-number'><em>#On the next page, use the card number 4242 4242 4242 4242, any future expiration date, and any three-digit CVV of your choice.</em></p>
                </div>
            </div>
        </form>
    )
}

export default PlaceOrder