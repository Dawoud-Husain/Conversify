# Conversify: A Real-time Chatting Application

![MERN Stack](https://img.shields.io/badge/MERN-Stack-green.svg)

A modern real-time chatting application built with the **MERN** (MongoDB, Express, React, Node.js) stack.

---

## ✨ Features
- Real-time messaging
- User authentication with JWT
- Scalable backend with Node.js and Express
- Responsive React frontend

---

## 📈 Improvements

### Sprint 1
- Implemented user profile creation and viewing
- Added support for custom profile pictures

**Links:**
- [Sprint Information](https://gitlab.socs.uoguelph.ca/cis4250-chatapp/chatapp/-/wikis/Sprint-1/Agile-Coach/Post-Project-Mortem-)
- [Technical Documentation](https://gitlab.socs.uoguelph.ca/cis4250-chatapp/chatapp/-/wikis/Sprint-1) (see content under Sprint 1 header)


### Sprint 2
- Pin Contacts
- Search and view profiles 
- Delete conversations
- Add and see friends

**Links:**
- [Sprint Information](https://gitlab.socs.uoguelph.ca/cis4250-chatapp/chatapp/-/wikis/Sprint-2/Agile-Coach)
- [Technical Documentation](https://gitlab.socs.uoguelph.ca/cis4250-chatapp/chatapp/-/wikis/Sprint-2) (see content under Sprint 2 header)


### Sprint 3
- Reacting to messages with Emojis 😀 
- Blocking users
- Specifying replies to specific messages
- Displaying friends current local time and country
- Notification system for when a user has been added as a friend


**Links:**
- [Sprint Information](https://gitlab.socs.uoguelph.ca/cis4250-chatapp/chatapp/-/wikis/Sprint-3/Agile-Coach)
- [Technical Documentation](https://gitlab.socs.uoguelph.ca/cis4250-chatapp/chatapp/-/wikis/Sprint-3) (see content under Sprint 3 header)




---

## 🚀 Local Development

### Prerequisites
- [Node.js](https://nodejs.org/en/download/) installed
- MongoDB Atlas cluster URI ([tutorial](https://www.mongodb.com/docs/atlas/tutorial/create-new-cluster/))
- JWT secret key ([generate here](https://jwtsecret.com/generate))

### Setup Instructions
1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/conversify.git
   cd conversify
   ```
2. **Create `.env` file** in the root directory:
   ```env
   PORT=3000
   MONGO_DB_URI=your_mongodb_uri_here
   JWT_SECRET=your_jwt_secret_here
   NODE_ENV=dev
   ```
3. **Install dependencies & start the app**
   ```bash
   npm install
   npm run build
   npm start
   ```
   The app will be available at `http://localhost:3000`.

---

## 🌐 Deployment to Production (Render)

1. **Sign up** on [Render](https://render.com) and create a **Web Service**.
2. **Configure environment variables** in Render:
   - `PORT`: `5000`
   - `MONGO_DB_URI`: Your MongoDB Atlas URI
   - `JWT_SECRET`: Your JWT secret key
3. **Deploy** the service. Render will automatically build and host your application.

---

## 👥 Contributors

- Jake McAuley (1060842)
- Dawoud Husain (1146816)
- Adhyayan Bhandari(1135943)
- Naza Anyaegbunam (1158144)
- Ike Agbaje (1125093)

---

## 📍 Project Information
**Group 6, Section 2**  
**University Of Guelph** - CIS*4250

---

🛠️ **Note**: Replace placeholders (`your_mongodb_uri_here`, `your_jwt_secret_here`) with actual values before use.

