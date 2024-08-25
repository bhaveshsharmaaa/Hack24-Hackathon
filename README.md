# React + Vite

# AcademiaHub

## Installation Guide

Follow the steps below to clone and set up the project on your local machine.

### 1. Clone the Repository

Clone the project to your local machine using the following command:

# 2. Change Directory to the Project Folder

cd AcademiaHub

# 3. Install Dependencies in the Root Directory

npm install

# 4. Change Directory to the Server Folder

cd server

# 5. Install Server Dependencies

npm install

# 6. Set Up Environment Variables

# Create a .env file in the server directory and add the following:

MAIL_HOST=#Your mail host
MAIL_USER=#Your mail ID
MAIL_PASS=#Your mail pass
CORS_ORIGIN=http://localhost:5173

JWT_SECRET="your secret key"

FOLDER_NAME= # Cloudinary folder name where you want to save images
FOLDER_VIDEO= # Cloudinary folder name where you want to save videos

CLOUD_NAME= #Your Cloudinary Name
API_KEY=#Your Cloudinary API key
API_SECRET=#Your Cloudinary Secret key

CONTACT_MAIL= # Enter your mail, User enquiries will be sent to this mail

PORT=\"8000\" # Server port number
MONGODB_URL=# your mongo url

# 7. Go Back to the Root Directory

cd ..

# 8. Start the Frontend

npm run dev1
