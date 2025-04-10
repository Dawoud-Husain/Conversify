# Conversify: A Real-time Chatting Application

![MERN Stack](https://img.shields.io/badge/MERN-Stack-green.svg) ![Socket.IO](https://img.shields.io/badge/Socket.io-black?style=flat&logo=socket.io) ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)

Conversify is a modern, real-time chatting application built with the MERN (MongoDB, Express, React, Node.js) stack, featuring live translation and a variety of interactive communication tools.

[![Watch the Demo Video]((https://img.youtube.com/vi/BYgusLCh9oY/0.jpg)](https://youtu.be/BYgusLCh9oY)

---

## ✨ Features

* **Real-time Messaging:** Instant message delivery using Socket.IO.
* **User Authentication:** Secure login and session management using JSON Web Tokens (JWT).
* **User Profiles:** Create, view, and edit user profiles with custom profile pictures.
* **Contact Management:**
    * Search for users and view profiles.
    * Add and manage friends.
    * Pin important contacts for quick access.
    * Block unwanted users.
    * Friend request notification system.
* **Conversation Management:**
    * Delete entire conversations.
    * Reply to specific messages within a chat.
* **Interactive Messaging:**
    * React to messages with emojis.
    * Live read-receipts to know when messages are seen.
    * Optional disappearing messages for enhanced privacy.
* **Collaboration & Utility:**
    * Live translation of messages between different languages.
    * Shared Todo lists within chats.
    * Display friend's current local time and country (if available).
* **Responsive Design:** Frontend built with React and Tailwind CSS for adaptability across devices.

---

## 🛠️ Tech Stack

* **Frontend:** React, Tailwind CSS, Zustand (State Management), Vite
* **Backend:** Node.js, Express.js
* **Database:** MongoDB (with Mongoose)
* **Real-time Communication:** Socket.IO
* **Authentication:** JWT

---

## 🚀 Local Development

### Prerequisites
* [Node.js](https://nodejs.org/en/download/) (v18 or later recommended)
* MongoDB Atlas cluster URI or local MongoDB instance ([tutorial](https://www.mongodb.com/docs/atlas/tutorial/create-new-cluster/))
* JWT secret key (you can generate one easily)

### Setup Instructions
1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/conversify.git](https://github.com/your-username/conversify.git) # Replace with your repo URL if forked
    cd conversify
    ```
2.  **Install Backend Dependencies:**
    ```bash
    cd backend
    npm install
    cd ..
    ```
3.  **Install Frontend Dependencies:**
    ```bash
    cd frontend
    npm install
    cd ..
    ```
4.  **Create `.env` file** in the `backend` directory:
    ```env
    PORT=5000 # Or any port you prefer
    MONGO_DB_URI=your_mongodb_uri_here
    JWT_SECRET=your_jwt_secret_here
    NODE_ENV=development
    # Add any other necessary environment variables (e.g., translation API keys if used)
    ```
5.  **Run the Application:**
    * **Start Backend:**
        ```bash
        cd backend
        npm run server # Or your specific start script
        ```
    * **Start Frontend (in a separate terminal):**
        ```bash
        cd frontend
        npm run dev # Or your specific start script
        ```
    The frontend will typically be available at `http://localhost:3000` (or the port specified by Vite), and the backend API at `http://localhost:5000` (or the `PORT` in your `.env`).

---

## 🌐 Deployment (Example: Render)

1.  **Sign up** on [Render](https://render.com) and create a **Web Service**.
2.  Connect your Git repository.
3.  **Configure Build & Start Commands:**
    * **Build Command:** `npm install && npm run build` (adjust based on your `package.json` scripts, potentially needing commands for both frontend and backend builds if not handled monolithically).
    * **Start Command:** `npm start` (ensure this script starts your backend server correctly).
4.  **Configure Environment Variables** in Render's dashboard:
    * `PORT`: Render typically sets this automatically, but you might need it for your app logic.
    * `MONGO_DB_URI`: Your production MongoDB Atlas URI.
    * `JWT_SECRET`: Your production JWT secret key.
    * `NODE_ENV`: `production`
    * Add any other required production variables.
5.  **Deploy** the service. Render will build and host your application.

---

## 👥 Contributors

* Dawoud Husain
* Jake McAuley
* Adhyayan Bhandari
* Naza Anyaegbunam
* Ike Agbaje

---

## 📄 License

This project is licensed under the terms of the [LICENSE](./LICENSE) file.

---

🛠️ **Note**: Replace placeholders like `your_mongodb_uri_here`, `your_jwt_secret_here`, and the Git clone URL with your actual values. Ensure your start scripts in `package.json` are correctly configured for both development and production environments.