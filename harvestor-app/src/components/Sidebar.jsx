import React from "react";
import HamburgerBar from "../assets/hamburger_bar.svg"

function Sidebar(){
    return (
        <div className="pt-4 pr-6">
            <img src={HamburgerBar} alt="sidebar" className="w-8 h-8"/>
        </div>
    )
}

export default Sidebar;