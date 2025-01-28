import React, { useState, useContext, useEffect } from 'react'
import "./Add.css"
import { assets } from '../../assets/assets'
import axios from "axios"
import { toast } from 'react-toastify';
import { StoreContext } from '../../context/StoreContext'
import {useNavigate} from "react-router-dom"



const Add = () => {

    let navigate = useNavigate()
    
    const {backend_url, token} = useContext(StoreContext)

    const [image, setImage] = useState(false)
    const [data, setData] = useState({
        name: "",
        description: "",
        price: "",
        category: "Chargers"
    })

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setData(data=>({...data,[name]:value}))
    }

    const onSubmitHandler = async(event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("name", data.name)
        formData.append("description", data.description)
        formData.append("price", data.price)
        formData.append("category", data.category)
        formData.append("image", image)
        const response = await axios.post(`${backend_url}/api/accessories/admin/add`, formData, {headers:{token}})
        if (response.data.success){
            setData({
                    name: "",
                    description: "",
                    price: "",
                    category: "Chargers"
            })
            setImage(false)
            toast.success(response.data.message)
        } else {
            toast.error(response.data.message)
        }
    }

    useEffect(()=>{
        if (!token){
            navigate("/")
            toast.error("Login to admin account")        
        } 
    }, [token])

    return (
        <div className='add'>
            <form className='flex-col' onSubmit={onSubmitHandler}>
                <div className="add-img-upload flex-col">
                    <p>Accessory Image</p>
                    <label htmlFor='image'>
                        <img src={image?URL.createObjectURL(image):assets.upload_area}/>
                    </label>
                    <input onChange={(e)=>setImage(e.target.files[0])} type="file" required hidden id="image"></input>
                </div>
                <div className='add-product-name flex-col'>
                    <p>Accessory Name</p>
                    <input value={data.name} onChange={onChangeHandler} type="text" required name='name' placeholder='Product name'></input>
                </div>
                <div className='add-product-desc flex-col'>
                    <p>Accessory Description</p>
                    <textarea type="text" value={data.description}  onChange={onChangeHandler} required name='description' rows="6" placeholder='Product description'></textarea>
                </div>
                <div className="add-category-price">
                    <div className="add-category flex-col">
                        <p>Accessory Category</p>
                        <select onChange={onChangeHandler} value={data.category} name='category'>
                            <option value="Chargers">Chargers</option>
                            <option value="Eco-Friendly">Eco-Friendly</option>
                            <option value="Exterior">Exterior</option>
                            <option value="Interior">Interior</option>
                            <option value="Lifestyle">Lifestyle</option>
                            <option value="Off-Road">Off-Road</option>
                            <option value="Safety">Safety</option>
                            <option value="Tech Gadgets">Tech Gadgets</option>
                        </select>
                    </div>
                </div>
                <div className="add-price flex-col">
                    <p>Accessory Price</p>
                    <input onChange={onChangeHandler} value={data.price} type="Number" name="price" placeholder='Product Price'/>
                </div>
                <button type="submit" className='add-button'>Add Accessory</button>
            </form>
        </div>
    )
}

export default Add