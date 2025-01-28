import React from 'react'
import "./AppDownload.css"
import {assets} from "../../assets/frontend_assets/assets"
import {Link} from 'react-router-dom'

const AppDownload = () => {
    return (
        <div className='app-download' id='app-download'>
            <p>Never Miss an Update on Your Orders</p>
            <br></br>
            EVolution App
            <div className='app-download-platforms'>
                <Link to="https://www.google.co.in/"><img src={assets.play_store} /></Link>
                <Link to="https://www.google.co.in/"><img src={assets.app_store} /></Link>
            </div>
        </div>
    )
}

export default AppDownload