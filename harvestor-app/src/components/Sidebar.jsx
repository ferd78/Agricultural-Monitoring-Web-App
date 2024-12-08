import React, { useState } from "react";
import HamburgerBar from "../assets/hamburger_bar.svg";
import CloseIcon from "../assets/close.png";
import Demo from "../assets/cube.png"
import Home from "../assets/home.png"
import { motion } from "framer-motion";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

  const sidebarVariants = {
    open: {
      x: 0,
      transition: { duration: 0.33, ease: "circInOut" },
    },
    closed: {
      x: "100%",
      transition: { duration: 0.33, ease: "circInOut" },
    },
  };

  return (
    <>
      {!isOpen && (
        <div
          className="absolute top-5 right-4 cursor-pointer"
          onClick={toggleSidebar}
        >
          <img
            src={HamburgerBar}
            alt="menu"
            className="w-8 h-8 transform transition hover:scale-110"
          />
        </div>
      )}

      <motion.div
        className={`absolute h-screen w-1/6 bg-secondary top-0 right-0`}
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        variants={sidebarVariants}
      >
        <button
          className="absolute top-5 left-5 transform transition duration-300 hover:scale-105"
          onClick={toggleSidebar}
        >
          <img src={CloseIcon} alt="close" className="w-3 h-3" />
        </button>

        <ul className="h-1/3 flex flex-col justify-center items-center ">
          <li className="mb-5 flex flex-row space-x-2 transform transition duration-300 hover:scale-105">
            <img src={Home} alt="homepage" className="w-6 h-6"/>
            <a className="text-2xl cursor-pointer "> Home </a>
          </li>
          <li className="flex flex-row space-x-2 transform transition duration-300 hover:scale-105">
            <img src={Demo} alt="demopage" className="w-6 h-6"/>
            <a className="text-2xl cursor-pointer "> Demo </a>
          </li>
        </ul>
      </motion.div>
    </>
  );
}

export default Sidebar;
