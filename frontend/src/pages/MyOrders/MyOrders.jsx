import React, { useContext, useEffect, useState } from 'react'
import "./MyOrders.css"
import { StoreContext } from '../../context/StoreContext';
import axios from "axios"
import { toast } from 'react-toastify';
import {assets} from "../../assets/frontend_assets/assets.js"


const MyOrders = () => {

    const {url, token} = useContext(StoreContext)
    const [data, setData] = useState([]);

    const fetchOrders = async() => {
        const response = await axios.post(url+"/api/order/userorders",{},{headers:{token}})
        if (response.data.success){
            setData(response.data.data)
        } else {
            toast.error(response.data.message)
        }
    }

    const trackUpdateNotify = () => {
        toast.info("Order status updated")
    }

    const trackUpdate = () => {
        fetchOrders()
        trackUpdateNotify()
    }

    useEffect(()=>{
        if (token){
            fetchOrders()
        }
    },[token])
 

    return (
        <div className='my-orders' id="my-orders-top">
            <div className='myorder-items-title'>
                <p>My Orders</p>
            </div>
            <br/>
            <hr/>
            <div className='container'>
                {data.map((order, index)=>{
                    return (
                        <div key={index} className='my-orders-order'>
                            <div className='top-section'>
                                <img src={assets.parcel_icon} alt="parcel icon"/>
                                    <div className="details">
                                    <p>Order Id: {order._id}</p>
                                    <p>{order.items.map((item, index)=>{
                                        if (index === order.items.length-1){
                                            return item.name+" x "+item.quantity
                                        } else {
                                            return item.name+" x "+item.quantity+", "
                                        }
                                    })}
                                    </p>
                                </div>
                            </div>
                            <div className="bottom-section">
                                <p>&#8377; {(order.amount).toLocaleString()} </p>
                                <p>{order.payment?"Paid":"Not paid"}</p>
                                <p>{order.status}</p>
                                <button onClick={trackUpdate}>Track order</button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    );

}

export default MyOrders