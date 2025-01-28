import React, { useContext, useEffect } from 'react'
import "./Cart.css"
import { StoreContext } from '../../context/StoreContext'
import { assets } from '../../assets/frontend_assets/assets'
import { useNavigate } from 'react-router-dom'
import {toast} from "react-toastify"

const Cart = () => {

    const {cartItems, cars_list, removeFromCart, getTotalCartAmount, url} = useContext(StoreContext)

    const navigate = useNavigate()

    const onclickHandlerPromo = () => {
        toast.error("Invalid promo code");
    };

    useEffect(()=>{
        if(getTotalCartAmount()===0){
            navigate("/")
            toast.info("Your cart is empty")
        }
    })

    return (
        <div className='cart' id='cart'>
            <div className='cart-items'>
                <div className='cart-items-title-top'>
                    <p>My Cart</p>
                </div>
                <br/>
                <hr/>
                <div className='container'>
                {
                    cars_list.map((item, index)=>{
                        if (cartItems[item._id]>0)
                        {
                            return (
                                <div key={index} className='cart-details'>
                                    <div className='cart-image-name'>
                                        <img src={url+"/images/"+item.image} />
                                        <div className='cart-name-category'>
                                            <p>{item.name}</p>
                                            <p>{item.category}</p>
                                        </div>
                                    </div>
                                    <div className='cart-bottom-price'>
                                        <p>&#8377; {item.price.toLocaleString()}</p>
                                        <p>Quantity: {cartItems[item._id]}</p>
                                        <p>&#8377; {(item.price* cartItems[item._id]).toLocaleString()}</p>
                                        <img onClick={()=>removeFromCart(item._id)} className='cross'src={assets.cross_icon}/>
                                    </div>
                                </div>
                            )
                        }
                    })
                }
            </div>
            </div>
            <div className='cart-bottom'>
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
                            <b>&#8377; {(getTotalCartAmount()?getTotalCartAmount()+499:"0").toLocaleString()} </b>
                        </div>
                    </div>
                    <button onClick={()=>navigate("/order")}>CHECKOUT</button>
                </div>
                <div className='cart-total'>
                    <p className='cart-total-title'>Promo Code</p>
                    <div>
                        <div className='promo-code-input'>
                            <input type='text' placeholder='Enter promo code here'/>
                        </div>
                    </div>
                    <button onClick={onclickHandlerPromo}>APPLY CODE</button>
                </div>
            </div>
        </div>
    )
}

export default Cart