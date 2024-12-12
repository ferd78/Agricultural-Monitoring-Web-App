import React from "react";
import leaf from "../assets/leaf.png";

function Description(){
    return (
        <div className="flex-1 flex flex-col items-center">
            <img src={leaf} alt="leaf_image" className="w-24 h-24"/>
            <a className="text-3xl text-center">Managing your crops has never been easier.</a>
        </div>
    );
}

export default Description;