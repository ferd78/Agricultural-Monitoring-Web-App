import React, { useState } from "react";
import { Card } from "@nextui-org/react";
import upload from "../assets/cloud-computing.png";
// import { Button } from "@nextui-org/react";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";

function ImageClassifier() {
    const [file, setFile] = useState(null);
    const [isDragging, setIsDragging] = useState(false); 
    const [uploadStatus, setUploadStatus] = useState(""); 
    const [selectedKeys, setSelectedKeys] = React.useState(new Set(["text"]));

    const selectedValue = React.useMemo(
        () => Array.from(selectedKeys).join(", ").replace(/_/g, ""),
        [selectedKeys],
    );
    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
        setUploadStatus(""); 
        console.log("The current file selected is: ", selectedFile);
    };

    const handleDrop = (event) => {
        event.preventDefault();
        setIsDragging(false); 
        const droppedFile = event.dataTransfer.files[0];
        setFile(droppedFile);
        setUploadStatus(""); 
        console.log("Dropped file is:", droppedFile);
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleDragEnter = () => {
        setIsDragging(true); 
    };

    const handleDragLeave = () => {
        setIsDragging(false); 
    };

    const handleUpload = async () => {
        if (!file) {
            setUploadStatus("Please drop or select a file first.");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {
            setUploadStatus("Uploading..."); 
            const response = await fetch("placeholder_backpoint", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                setUploadStatus("File uploaded successfully!");
            } else {
                setUploadStatus("Failed to upload file.");
            }
        } catch (error) {
            console.error("Error uploading file:", error);
            setUploadStatus("An error occurred while uploading the file.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center w-screen h-screen">
            <Card
                className={`w-1/3 h-1/3 rounded-xl shadow-md border-2 bg-secondary ${
                    isDragging ? "border-blue-500 bg-blue-100" : "border-dashed border-black"
                } flex items-center justify-center`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
            >
                <div className="flex flex-col items-center justify-center">
                    <img src={upload} alt="Upload Icon" className="w-16 h-16 mb-4" />
                    <a href="#" className="text-center text-black font-bold">
                        Drag and Drop your files here or{" "}
                        <label
                            htmlFor="fileInput"
                            className="text-blue-500 underline cursor-pointer font-bold"
                        >
                            Browse
                        </label>
                    </a>
                    <input
                        id="fileInput"
                        type="file"
                        className="hidden"
                        onChange={handleFileChange}
                    />
                </div>
            </Card>
            <Button
                onClick={handleUpload}
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition font-bold"
            >
                Upload File
            </Button>
            <Dropdown className="rounded-lg bg-white font-bold px-4 py-2">
                <DropdownTrigger>
                    <Button className="bg-white rounded-lg font-bold mt-4">
                    {selectedValue}
                    </Button>
                </DropdownTrigger>
                <DropdownMenu
                    disallowEmptySelection
                    aria-label="Single selection example"
                    selectedKeys={selectedKeys}
                    selectionMode="single"
                    onSelectionChange={setSelectedKeys}
                >
                    <DropdownItem key="text">CNN</DropdownItem>
                    <DropdownItem key="number">MobileNet</DropdownItem>
                    <DropdownItem key="date">NestNet</DropdownItem>
                    <DropdownItem key="single_date">EfficientNet</DropdownItem>
                </DropdownMenu>`
            </Dropdown>
            <p className="mt-6 text-red-600 font-bold">{uploadStatus}</p>
        </div>
    );
}

export default ImageClassifier;
