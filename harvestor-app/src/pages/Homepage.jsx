import React from "react";
import Logo from "../components/Logo";
import Sidebar from "../components/Sidebar";

function Homepage(){
    return (
        <div className="bg-primary min-h-screen">
            <div className="flex flex-row justify-between">
                <Logo/>      
                <Sidebar/>
            </div>
            
        </div>
    );
}

export default Homepage;