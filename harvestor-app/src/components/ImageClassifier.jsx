import React, { useState } from "react";
import {
    Card,
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    Button,
} from "@nextui-org/react";
import upload from "../assets/cloud-computing.png";

function ImageClassifier() {
    const [file, setFile] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const [uploadStatus, setUploadStatus] = useState("");
    const [selectedModel, setSelectedModel] = useState("EfficientNet");
    const [result, setResult] = useState(""); // Store result as a string for the textbox

    const modelEndpoints = {
        EfficientNet: "http://localhost:8000/predict_efficientnet/",
        CNN: "http://localhost:8000/predict_cnn/",
        MobileNet: "http://localhost:8000/predict_mobilenet/",
        NASNet: "http://localhost:8000/predict_nasnet/",
    };

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
        setUploadStatus("");
        setResult(""); // Clear previous result
    };

    const handleDrop = (event) => {
        event.preventDefault();
        setIsDragging(false);
        const droppedFile = event.dataTransfer.files[0];
        setFile(droppedFile);
        setUploadStatus("");
        setResult(""); // Clear previous result
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

    const handleModelChange = (key) => {
        setSelectedModel(key);
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
            const response = await fetch(modelEndpoints[selectedModel], {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                // Store API response as a formatted string
                setResult(
                    `Model Name: ${data.model}\nDisease: ${data.predicted_disease}\nConfidence Score: ${data.confidence_score.toFixed(
                        2
                    )}`
                );
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
            {/* Drag and Drop Card */}
            <Card
                className={`w-1/3 h-1/3 rounded-xl shadow-md border bg-secondary ${
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

            {/* Dropdown and Upload Button */}
            <div className="space-x-4">
                <Dropdown>
                    <DropdownTrigger>
                        <Button className="bg-quaternary rounded-lg font-bold mt-4">
                            Choose model: {selectedModel}
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu
                        aria-label="Model Selection"
                        selectionMode="single"
                        onAction={handleModelChange}
                    >
                        <DropdownItem key="EfficientNet" className="bg-green-500 rounded-md shadow-xl">EfficientNet</DropdownItem>
                        <DropdownItem key="CNN" className="bg-red-500 rounded-md shadow-xl">CNN</DropdownItem>
                        <DropdownItem key="MobileNet" className="bg-blue-500 rounded-md shadow-xl">MobileNet</DropdownItem>
                        <DropdownItem key="NASNet" className="bg-white rounded-md shadow-xl">NASNet</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                <Button
                    onClick={handleUpload}
                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition font-bold"
                >
                    Upload File
                </Button>
            </div>

            {/* Status Message */}
            <p className="mt-6 text-red-600 font-bold">{uploadStatus}</p>

            {/* Result Textbox */}
            {result && ( 
                <div className="flex flex-col pt-4 space-y-1.5 font-bold">
                    <a href="">Below are the results:</a>
                    <textarea
                    className="w-80 h-32 mt-6 p-4 rounded-xl bg-white resize-none"
                    value={result}
                    readOnly
                />
                </div>
                
            )}
        </div>
    );
}

export default ImageClassifier;