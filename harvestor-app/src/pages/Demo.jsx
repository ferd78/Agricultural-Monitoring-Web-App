import React from "react";
import Logo from "../components/Logo";
import ImageClassifier from "../components/ImageClassifier";


function Demo(){
    
    

    return (
        <div className="bg-tertiary h-screen relative">
            <Logo/>
            <div className="h-full flex items-center justify-center">
                <ImageClassifier/>
            </div>
        </div>
    );
}

export default Demo;