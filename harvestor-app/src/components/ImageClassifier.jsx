import React, { useState } from "react";
import {
    Card,
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    Button,
    Progress,
} from "@nextui-org/react";
import upload from "../assets/cloud-computing.png";

function ImageClassifier() {
    const [file, setFile] = useState(null);
    const [filePreview, setFilePreview] = useState(null); // State for preview URL
    const [isDragging, setIsDragging] = useState(false);
    const [uploadStatus, setUploadStatus] = useState("");
    const [selectedModel, setSelectedModel] = useState("EfficientNet");
    const [result, setResult] = useState(null);

    const getProgressColor = (score) => {
        if (score > 80) return "secondary"; // Green
        if (score > 50) return "warning"; // Yellow
        return "warning"; // Red
    };

    const modelEndpoints = {
        EfficientNet: "http://47.129.0.222:8000/predict_efficientnet/",
        CNN: "http://47.129.0.222:8000/predict_cnn/",
        MobileNet: "http://47.129.0.222:8000/predict_mobilenet/",
        NASNet: "http://47.129.0.222:8000/predict_nasnet/",
    };

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setFilePreview(URL.createObjectURL(selectedFile)); // Generate preview URL
            setUploadStatus("");
            setResult(null); // Clear previous result
        }
    };

    const handleDrop = (event) => {
        event.preventDefault();
        setIsDragging(false);
        const droppedFile = event.dataTransfer.files[0];
        if (droppedFile) {
            setFile(droppedFile);
            setFilePreview(URL.createObjectURL(droppedFile)); // Generate preview URL
            setUploadStatus("");
            setResult(null); // Clear previous result
        }
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
                setResult({
                    model: data.model,
                    disease: data.predicted_disease,
                    confidenceScore: data.confidence_score * 100, // Convert to percentage for the progress bar
                });
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
                className={`w-1/3 h-1/3 rounded-xl shadow-md border bg-quinary ${
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

            <div className="space-x-4">
                <Dropdown backdrop="blur">
                    <DropdownTrigger>
                        <Button className="shadow-xl bg-quaternary rounded-lg font-bold mt-4">
                            Choose model: {selectedModel}
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu
                        aria-label="Model Selection"
                        selectionMode="single"
                        onAction={handleModelChange}
                    >
                        <DropdownItem key="EfficientNet" className="bg-green-500 rounded-md shadow-xl">
                            EfficientNet
                        </DropdownItem>
                        <DropdownItem key="CNN" className="bg-red-500 rounded-md shadow-xl">
                            CNN
                        </DropdownItem>
                        <DropdownItem key="MobileNet" className="bg-blue-500 rounded-md shadow-xl">
                            MobileNet
                        </DropdownItem>
                        <DropdownItem key="NASNet" className="bg-white rounded-md shadow-xl">
                            NASNet
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                <Button
                    onClick={handleUpload}
                    className="shadow-xl mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition font-bold"
                >
                    Upload File
                </Button>
            </div>

            <p className="mt-6 text-red-600 font-bold">{uploadStatus}</p>

            {result && (
    <Card className="mt-6 w-96 p-6 shadow-lg bg-gray-100 rounded-lg">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Detection Results: </h2>
        <div className="flex flex-row items-start">
            {/* Left Side: Uploaded Image */}
            {filePreview && (
                <div className="w-1/3 mr-4">
                    <h3 className="text-sm font-bold text-gray-700 mb-2">Uploaded File:</h3>
                    <img
                        src={filePreview}
                        alt="Uploaded Preview"
                        className="w-full h-auto rounded-lg shadow-md"
                    />
                </div>
            )}

            {/* Right Side: Results */}
            <div className="w-2/3">
                <p className="text-md mt-2">
                    <strong>Model Name:</strong> {result.model}
                </p>
                <p className="text-md mt-2">
                    <strong>Disease:</strong> {result.disease}
                </p>
                <p className="text-md mt-2">
                    <strong>Confidence Score:</strong>
                </p>
                <Progress
                    color={getProgressColor(result.confidenceScore)}
                    value={result.confidenceScore}
                    className="mt-2"
                    label={result.confidenceScore + "%"}
                />
            </div>
        </div>
    </Card>
)}
        </div>
    );
}

export default ImageClassifier;