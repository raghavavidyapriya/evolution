import React, {useState, useContext} from 'react'
import "./Orders.css"
import {toast} from "react-toastify"
import { useEffect } from 'react';
import {assets} from "../../assets/assets.js"
import axios from "axios"
import { StoreContext } from '../../context/StoreContext'
import {useNavigate} from "react-router-dom"


const Orders = () => {

    let navigate = useNavigate()

    const {backend_url, token} = useContext(StoreContext)

    const [orders, setOrders] = useState([]);

    const fetchAllOrders= async() => {
        const response = await axios.get(`${backend_url}/api/order/admin/list`, {headers:{token}})
        if (response.data.success){
            setOrders(response.data.data)
        } else {
            toast.error("Error in fetching orders")
        }
    }

    useEffect(()=>{
            fetchAllOrders()   
    }, [])

    useEffect(()=>{
        if (!token){
            navigate("/")
            toast.error("Login to admin account")        
        } 
    }, [token])

    const statusHandler = async(event, orderId) => {
        const response = await axios.post(backend_url+"/api/order/admin/status",{
            orderId,
            status:event.target.value
        }, {headers:{token}})
        if (response.data.success){
            await fetchAllOrders();
            toast.success(response.data.message)
        } else {
            toast.error(response.data.message)
        }
    }


    return (
            <div className='order-list'>
                <div className='order add  .title-top'>
                <div className='order-items-title'>
                    <p>Orders Placed</p>
                </div>
            <div className='container'></div>
                {
                    orders.map((order, index)=>{
                        let parsedAddress = JSON.parse(order.address);

                        return (
                        <div key={index} className='order-item'>
                            <div className='orders-top'>
                            <img src={assets.parcel_icon}/>
                            <div>
                                <p className='order-item-cars'>
                                    {
                                        order.items.map((item, index)=>{
                                            if (index===order.items.length-1){
                                                return item.name + " x " + item.quantity
                                            } else{
                                                return item.name + " x " + item.quantity + ", "
                                            }
                                        })
                                    }
                                    </p>
                                </div>
                                </div>
                                <div className='orders-card-middle'>
                                <div className='middle-phone-name'>
                                    <p className="order-item-name">{parsedAddress.firstName+" "+parsedAddress.lastName}</p>
                                    <p className='order-item-phone'>{parsedAddress.phoneNumber}</p>
                                </div>
                                <div className="order-item-address">
                                    <p>{parsedAddress.building+", "+parsedAddress.street}</p>
                                    <p>{parsedAddress.landMark+", "+parsedAddress.city}</p>
                                    <p>{parsedAddress.state+", "+parsedAddress.pincode}</p>
                                </div>
                                </div>
                                <div className='orders-card-bottom'>
                                <div className='payment-status'>
                                    <p>&#8377; {(order.amount).toLocaleString()}</p>
                                </div>
                                <div>
                                    <p>{order.payment?"Paid":"Not paid"}</p>
                                </div>
                                <select onChange={(event)=>statusHandler(event, order._id)} value={order.status}>
                                    <option value="Processing">Processing</option>
                                    <option value="Out for delivery">Out for delivery</option>
                                    <option value="Delivered">Delivered</option>
                                </select>
                                </div>
                        </div>
                    )}
                )}
            </div>
        </div>
    )
}

export default Orders