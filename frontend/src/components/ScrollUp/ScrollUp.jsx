import React from 'react'
import "./ScrollUp.css"
import { assets } from '../../assets/frontend_assets/assets'


const ScrollUp = ({setMenu}) => {

    window.addEventListener("scroll", function(){
        const scrollUp = document.querySelector(".scrollup");
        if (scrollUp){
            if (this.scrollY >= 100) {
                scrollUp.classList.add("show-scroll");
            } else {
                scrollUp.classList.remove("show-scroll");
            }
        }
    })
    return (
        <i 
            onClick={()=>{
            setMenu("home");
            setTimeout(() => {
                document.getElementById("header").scrollIntoView({ behavior: "smooth" });
            }, 100);
            }} 
            className="scrollup">
            <img src={assets.up} className="scrollup__icon">
            </img>
        </i>
    )
}

export default ScrollUp