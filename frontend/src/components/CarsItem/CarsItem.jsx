import React, { useContext } from 'react'
import "./CarsItem.css"
import { assets } from '../../assets/frontend_assets/assets'
import { StoreContext } from '../../context/StoreContext'

const CarsItem = ({id, name, price, description, image}) => {

    const {cartItems, addToCart, removeFromCart, url} = useContext(StoreContext)

    return (
        <div className='cars-item'>
            <div className="cars-item-img-container">
                <img className='cars-item-image' src={url+"/images/"+image} />
                {
                    !cartItems[id]
                        ? <img className='add' onClick={()=>addToCart(id)} src={assets.add_icon_white}/>
                        : <div className='cars-item-counter'>
                            <img className='remove' onClick={()=>removeFromCart(id)} src={assets.remove_icon_red} />
                            <p>{cartItems[id]}</p>
                            <img className='add-plus' onClick={()=>addToCart(id)} src={assets.add_icon_green} />                           
                        </div>
                }
            </div>
            <div className='cars-item-info'>
                <div className='cars-item-name-rating'>
                    <p>{name}</p>
                    <img src={assets.rating_starts}/>
                </div>
                <div className='cars-item-desc'><p>{description}</p></div>
                <p className='cars-item-price'>&#8377; {price}</p>
            </div>
        </div>
    )
}

export default CarsItem