import React, {useContext, useState} from 'react'
import "./LoginPopup.css"
import { assets } from '../../assets/frontend_assets/assets'
import { StoreContext } from '../../context/StoreContext'
import axios from "axios"
import { toast } from 'react-toastify';


const LoginPopup = ({setShowLogin}) => {
    const {url, setToken} = useContext(StoreContext)

    const [currState, setCurrState] = useState("Create Account")
    const [data, setData] = useState({
        name:"",
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
        let newURL = url;
        if (currState==="Login"){
            newURL += "/api/user/login"
        } else {
            newURL += "/api/user/register"
        }

        const response = await axios.post(newURL, data)
        if (response.data.success){
            setToken(response.data.token)
            localStorage.setItem("token",response.data.token)
            setShowLogin(false)
            toast.success(response.data.message)
        } else{
            toast.error(response.data.message)
        }
    }



    return (
        <div className='login-popup'>
            <form onSubmit={onLogin} className='login-popup-container'>
                <div className='login-popup-title'>
                    <p>{currState}</p>
                    <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} />
                </div>
                <div className='login-popup-inputs'>
                    {currState==="Login"?<></>: <input name='name' onChange={onChangeHandler} value={data.name} type='text' placeholder='Your Name' required/>}
                    <input name='email' onChange={onChangeHandler} value={data.email} type='email' placeholder='Your Email' required/>
                    <input name='password' onChange={onChangeHandler} value={data.password} type='password' placeholder='Your Password' required/>
                </div>
                <button type="submit" >{currState==="Create Account"?"Create Account": "Login"}</button>
                <div className='login-popup-condition'>
                    <input type="checkbox" required/>
                    <em><p>By accepting, I agree to the terms of use and Privacy policy</p></em>
                </div>
                <hr />
                {currState==="Login"
                ?<button onClick={()=>setCurrState("Create Account")}>Create Account</button>
                :<button onClick={()=>setCurrState("Login")}>Login</button>}
            </form>
        </div>
    )
}

export default LoginPopup