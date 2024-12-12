import React from "react";
import logo from "../assets/project_logo.png";
import { useNavigate } from "react-router-dom";

function Logo(){
    const navigate = useNavigate();

    function handleNavigate() {
        navigate("/home");
    }

    return (
        <div className="flex justify-right items-center pt-4 pl-4 absolute">
            <img src={logo} alt="harvestor_logo" className="w-72 transform transition duration-300 hover:scale-105 cursor-pointer drop-shadow-lg" onClick={handleNavigate}/>
        </div>
    );
}

export default Logo;