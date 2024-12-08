import React from "react";
import Logo from "../components/Logo";
import Sidebar from "../components/Sidebar";

function Homepage(){
    return (
        <div className="bg-tertiary min-h-screen">
            <div className="flex flex-row">
                <Logo/>      
                <Sidebar/>
            </div>
            
        </div>
    );
}

export default Homepage;