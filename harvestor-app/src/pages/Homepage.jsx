import React from "react";
import Logo from "../components/Logo";
import Description from "../components/Description";
import About from "../components/About";

function Homepage() {

    return (
        <div className="bg-tertiary h-screen relative">
            <Logo/>
            <div className="flex flex-col h-full justify-between"> 
                <div className="flex-col flex items-center justify-center mt-80">
                    <Description />
                    <About />
                </div>
            </div>
        </div>
    );
}

export default Homepage;
