from fastapi import FastAPI, UploadFile, File
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
from tensorflow.keras.preprocessing.image import ImageDataGenerator
import numpy as np
import shutil
import os
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI




# Initialize FastAPI app
app = FastAPI()
# Allow requests from React app's origin
origins = [
    "http://localhost:5173",  # React development server
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (e.g., POST, GET)
    allow_headers=["*"],  # Allow all headers
)


# Define dataset paths
train_dir = 'Npd/New Plant Diseases Dataset(Augmented)/train'
valid_dir = 'Npd/New Plant Diseases Dataset(Augmented)/valid'
# Load the saved models
efficientnet_model = load_model('efficientnet_plant_disease_model.h5')
cnn_model = load_model('cnn_plant_disease_model.h5')
mobilenet_model = load_model('mobilenet_plant_disease_model.h5')
nasnet_model = load_model('nasnet_plant_disease_model.h5')

train_datagen = ImageDataGenerator(
    rescale=1./255,             # Normalize pixel values to [0, 1]
    rotation_range=20,          # Randomly rotate images
    width_shift_range=0.2,      # Randomly shift images horizontally
    height_shift_range=0.2,     # Randomly shift images vertically
    shear_range=0.2,            # Randomly apply shearing
    zoom_range=0.2,             # Randomly zoom into images
    horizontal_flip=True,       # Randomly flip images horizontally
    fill_mode='nearest'         # Fill missing pixels with the nearest value
)


# Load the data
train_generator = train_datagen.flow_from_directory(
    train_dir,
    target_size=(128, 128),
    batch_size=32,
    class_mode='categorical'
)

# Get class labels
class_labels = {v: k for k, v in train_generator.class_indices.items()}

def predict_image(file_path, model, target_size=(128, 128)):
    # Load and preprocess the image
    img = image.load_img(file_path, target_size=target_size)
    img_array = image.img_to_array(img) / 255.0  # Normalize
    img_array = np.expand_dims(img_array, axis=0)  # Add batch dimension

    # Predict class
    predictions = model.predict(img_array)
    predicted_class_index = np.argmax(predictions, axis=1)[0]
    predicted_class_label = class_labels[predicted_class_index]
    confidence_score = float(predictions[0][predicted_class_index])  # Convert to Python float

    return predicted_class_label, confidence_score




# Endpoints



# EfficientNet 
@app.post("/predict_efficientnet/")
async def predict_disease_efficientnet(file: UploadFile = File(...)):
    # Save image to a temporary file
    temp_file = "temp_image.jpg"
    with open(temp_file, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Predict
    predicted_label, confidence = predict_image(temp_file, efficientnet_model)

    # Remove temporary file
    os.remove(temp_file)

    return {"model": "EfficientNet", "predicted_disease": predicted_label, "confidence_score": confidence}

# CNN
@app.post("/predict_cnn/")
async def predict_disease_cnn(file: UploadFile = File(...)):
    temp_file = "temp_image.jpg"
    with open(temp_file, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    predicted_label, confidence = predict_image(temp_file, cnn_model)

    os.remove(temp_file)

    return {"model": "CNN", "predicted_disease": predicted_label, "confidence_score": confidence}

# MobileNet 
@app.post("/predict_mobilenet/")
async def predict_disease_mobilenet(file: UploadFile = File(...)):
    temp_file = "temp_image.jpg"
    with open(temp_file, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    predicted_label, confidence = predict_image(temp_file, mobilenet_model)

    os.remove(temp_file)

    return {"model": "MobileNet", "predicted_disease": predicted_label, "confidence_score": confidence}

# NASNet 
@app.post("/predict_nasnet/")
async def predict_disease_nasnet(file: UploadFile = File(...)):
    temp_file = "temp_image.jpg"
    with open(temp_file, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    predicted_label, confidence = predict_image(temp_file, nasnet_model)

    os.remove(temp_file)

    return {"model": "NASNet", "predicted_disease": predicted_label, "confidence_score": confidence}

