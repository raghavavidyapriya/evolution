import React, { useEffect, useState, useContext } from 'react'
import "./List.css"
import axios from "axios"
import {toast} from "react-toastify"
import {assets} from "../../assets/assets.js"
import { StoreContext } from '../../context/StoreContext'
import {useNavigate} from "react-router-dom"


const List = () => {

    let navigate = useNavigate()

    const {backend_url, token} = useContext(StoreContext)

    const [list, setList] = useState([]);

    const fetchList = async() => {
        const response = await axios.get(`${backend_url}/api/accessories/list`)
        if (response.data.success){
            setList(response.data.data)
        } else {
            toast.error("Error in fetching accessories")
        }
    }

    const removeItem = async(itemId) => {
        const response = await axios.post(`${backend_url}/api/accessories/admin/delete`, {id:itemId}, {headers:{token}})
        if (response.data.success){
            toast.success(response.data.message)
        } else {
            toast.error("Error in deleting accessories")
        }
        await fetchList()
    }

    useEffect(()=>{
        fetchList();
    }, [])

    useEffect(()=>{
        if (!token){
                navigate("/")
                toast.error("Login to admin account")        
        } 
    }, [token])

    return (
        <div className='list'>
            <div className='list-items'>
                <div className='list-items-title title-top'>
                    <p>Item</p>
                    <p className='list-details-mobile'>Details</p>
                    <p>Price</p>
                    <p>Remove</p>
                </div>
                <br/>
                <hr/>
                {
                    list.map((item, index)=>{
                        return (
                            <div>
                                <div key={index} className='list-items-title list-items-item'>
                                    <img src={`${backend_url}/images/`+item.image}/>
                                    <div className='list-item-detail'>
                                    <p>{item.category}</p>
                                    <p>{item.name}</p>
                                    </div>
                                    <p className='list-item-price'> &#8377; {(item.price).toLocaleString()}</p>
                                    <img onClick={()=>removeItem(item._id)} className='cross' src={assets.cross_icon}></img>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default List