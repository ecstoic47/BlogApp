import React from 'react';
import "./header.css";
import bgImg from "./images/bgImg.jpeg";

export default function Header() {
    return (
        <div className ="header">
           <div className="headerTitle">
               <span className="headerTilteSm">React & Node</span>
               <span className="headerTitleLg">Blog</span>
           </div>
           <img className = "headerImg" src={bgImg} alt="" />
        </div>
    )
}
