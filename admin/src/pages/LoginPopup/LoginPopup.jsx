import React, {useContext, useState} from 'react'
import "./LoginPopup.css"
import { StoreContext } from '../../context/StoreContext'
import axios from "axios"
import { toast } from 'react-toastify';
import {useNavigate} from 'react-router-dom'


const LoginPopup = () => {

    let navigate = useNavigate()

    const {backend_url, setToken} = useContext(StoreContext)

    const [data, setData] = useState({
        email:"",
        password:"",
    })

    const onChangeHandler = (event) => {
        const name = event.target.name
        const value = event.target.value
        setData(data=>({...data, [name]:value}))
    }

    const onLogin = async(event) => {
        event.preventDefault()

        const response = await axios.post(backend_url+"/api/admin/login", data)
        if (response.data.success){
            setToken(response.data.token)
            localStorage.setItem("token",response.data.token)
            toast.success(response.data.message)
            navigate("/add")
        } else{
            toast.error(response.data.message)
        }
    }

    return (
        <div className='login-popup'>
            <form onSubmit={onLogin} className='login-popup-container'>
                <div className='login-popup-title'>
                    <p>Admin Login</p>
                </div>
                <div className='login-popup-inputs'>
                    <input name='email' onChange={onChangeHandler} value={data.email} type='email' placeholder='Your Email' required/>
                    <input name='password' onChange={onChangeHandler} value={data.password} type='password' placeholder='Your Password' required/>
                </div>
                <button type="submit" >Login</button>
            </form>
        </div>
    )
}

export default LoginPopup