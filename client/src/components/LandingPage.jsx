import React from "react";
import { NavLink } from "react-router-dom";

import "../styles/LandingPage.css"

export default function LandingPage(){
    return (
        <div className="landingPage">
            <h1 className="welcomeLetters">Welcome to the Dogs App</h1>
            <NavLink to = "/home" className="containerbuttonlanding">
            <button className="button_landing">HOME🐾</button>
            </NavLink>
        </div>
    )
};
