import React from "react";
import { Accordion, AccordionItem } from "@nextui-org/react";
import { Button, ButtonGroup} from "@nextui-org/react";
import Cube from "../assets/cube.png";
import { useNavigate } from "react-router-dom";

function About(){
    
    const navigate = useNavigate();

    function handleNavigation() {
        navigate("/demo");
    }

    return (
        <Accordion className="w-1/2" variant="light">
            <AccordionItem key={1} title="About" className="border-black font-light text-3xl text-justify mt-12">
                <a className="font-normal text-lg">
                Harvestor is a distributed system project that is catered to the optimization of agricultural monitoring by utilizing machine learning techniques. Harvestor not only strives to improve the availability of crop detection systems, it provides a comparison of different algorithms, allowing users to optimize their crop detection.
                </a>
            </AccordionItem>    
            <AccordionItem key={2} title="Demo" className="font-light text-3xl text-justify pt-5">
                <a className="flex flex-col font-normal text-lg">
                The demo below will showcase a system that allows users to import images of crops. The system will then determine and analyze the overall state of the crop which can range from health indication to disease identification.

                <div>

                </div>
                    <Button className="mx-auto my-4 w-1/6 bg-quinary rounded-lg flex items-center justify-center" onClick={handleNavigation}>
                    <img src={Cube} alt="" className="w-4"/>
                    Go To Demo
                    </Button>
                </a>
            </AccordionItem>    
        </Accordion>
    );
}

export default About;