import React from 'react'
import "./Navbar.css"
import {assets} from "../../assets/assets.js"
import {useNavigate} from "react-router-dom"
import { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext.jsx'

const Navbar = () => {

    let navigate = useNavigate()
    const {setToken} = useContext(StoreContext)

    const logout = () => {
        localStorage.removeItem("token")
        setToken("")
        navigate("/")
        toast.success("Logged out successfully")
    }

    return (
        <div className='navbar'>
            <img src={assets.logo_name} alt="" className="logo" />
            <div className='navbar-right'>
            <li className='profile-li'>
                <img src={assets.profile_image} alt="" className="profile" />
            </li>
            <li className='logout-li'>
                <img src={assets.logout_icon} onClick={logout} className='logout-icon-img'/>
            </li>
            </div>
        </div>
    )
}

export default Navbar