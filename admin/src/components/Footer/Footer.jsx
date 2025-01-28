import React from 'react'
import "./Footer.css"
import {assets} from "../../assets/assets"
import { useNavigate, Link } from 'react-router-dom'


const Footer = () => {
    const navigate = useNavigate()

    const share = async () => {
        if (navigator.share) {
        try {
            await navigator.share({
                title: "EVolution",
                text: "Check out Raghava's amazing MERN Stack Project",
                url: window.location.href,
            });
            } catch (err) {
                console.error("Error sharing:", err);
            }}
        }

    return (
        <div className='footer' id='footer'>
            <div className='footer-content'>
                <div className='footer-content-left'>
                        <img src={assets.logo_name} className='logo'/>
                        <p>We specialize in premium electric vehicle accessories, 
                            offering high-quality, innovative products designed to 
                            enhance the EV experience. From advanced charging 
                            solutions to stylish interior upgrades, we provide everything 
                            needed for both convenience and performance. 
                            Sustainable, reliable, and user-friendly, our accessories 
                            are the perfect complement to your EV journey.
                            <br/><br/>
                            <em>*This is Raghava's personal project, Not affiliated to any company.</em>
                        </p>
                </div>
                <div className='footer-content-center'>
                    <h2>Company</h2>
                    <ul>
                        <Link to="/"><li onClick={()=>navigate("/")}>Home</li></Link>
                        <Link to="https://www.google.co.in/"><li>About Us</li></Link>
                        <Link to="https://www.google.co.in/"><li>Terms of Use</li></Link>
                        <Link to="https://www.google.co.in/"><li>Privacy Policy</li></Link>
                        <li onClick={()=>share()}>Let People Know</li>
                    </ul>
                </div>
                <div  className='footer-content-right'>
                    <h2>Get In Touch</h2>
                    <ul>
                        <li><a href="tel:+1234567890">+1234567890</a></li>
                        <li><a href="mailto:raghavavidyapriya@gmail.com">raghavavidyapriya@gmail.com</a></li>
                        <li><a href="https://www.google.com/maps/">ABC Park, R Country - 654321</a></li>
                    </ul>
                    <div className='footer-social-icons'>
                            <a href="https://www.linkedin.com/in/raghavavidyapriya/" target="_blank" rel="noopener noreferrer"><img src={assets.linkedin_icon} /></a>
                            <a href="https://github.com/raghavavidyapriya/" target="_blank" rel="noopener noreferrer"><img src={assets.github_icon} /></a>
                            <a href="https://raghavavidyapriya.onrender.com" target="_blank" rel="noopener noreferrer"><img src={assets.twitter_icon} /></a>
                            <a href="https://raghavavidyapriya.onrender.com" target="_blank" rel="noopener noreferrer"><img src={assets.instagram_icon} /></a>
                    </div>
                </div>
            </div>
            <hr />
            <p className='footer-copyright'>Designed & Developed by <a href="https://raghavavidyapriya.onrender.com" target="_blank" rel="noopener noreferrer">Raghava</a></p>
        </div>
    )
}

export default Footer