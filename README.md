# 🛰️ IMF Gadget API

An API system for managing high-tech gadgets used by the IMF (Impossible Missions Force). Built with **Node.js**, **Express**, and **MongoDB**, it allows agents to register, manage gadgets, and perform mission-critical operations like deployment, decommissioning, and self-destruction.

---

## 🚀 Features

- 🔐 User Authentication (Register, Login, Logout)
- 📦 CRUD operations on gadgets
- 🪖 Deploy, Destroy, and Decommission gadgets
- 🧨 Trigger a Self-Destruct sequence with confirmation
- 📊 Filter gadgets by status
- 🌐 Flash message feedback for user actions
- 🧪 Postman documentation for API testing

---

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Templating**: EJS
- **Authentication**: JWT, Cookie-based
- **Styling**: Tailwind CSS
- **Flash Messaging**: connect-flash
- **Testing & Docs**: Postman

---

## 📂 Folder Structure

\`\`\`
.
├── models/             # Mongoose Schemas
├── routes/             # API & Web Routes
├── middleware/         # Auth and access control
├── views/              # EJS templates
├── public/             # CSS, JS, and Assets
├── .env                # Environment variables
└── server.js           # Entry point
\`\`\`

---

## 📌 Installation

\`\`\`bash
git clone https://github.com/your-username/imf-gadget-api.git
cd imf-gadget-api
npm install
\`\`\`

Create a `.env` file:

\`\`\`
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
\`\`\`

---

## 🧪 API Documentation

> 📎 **Postman Docs**:  
[👉 View API Documentation](https://blala6.postman.co/workspace/Team-Workspace~aa69413f-7832-4ef1-830c-3ca6c499771b/collection/39160176-cabab522-5d4d-458d-a90b-a24b09149902?action=share&creator=39160176)

> 📂 **Run Locally (Optional)**:
\`\`\`
node server.js
\`\`\`
Visit: [http://localhost:3000](http://localhost:3000)

---

## 🌐 Deployment

> 🔗 **Live API**:  
[https://imf-gadget-api.vercel.app](https://imf-gadget-api.vercel.app)

Make sure to use `.env` on your hosting platform (e.g., Render, Vercel, or Railway).

---

## 🧠 Use Case Examples

- ✅ Register and login
- 📥 Add and manage gadgets
- 🚀 Deploy gadgets for missions
- 💥 Initiate self-destruct sequences
- 🔍 Filter gadgets by status (Available, Deployed, Destroyed, etc.)

---

## 📸 Screenshots

Here is the preview of the dashboard of the Phoenix.
![Screenshot](public\assests\ScreenShot.png)

---

## 🙌 Acknowledgements

- Node.js & Express Docs  
- Postman API Tools  
- MongoDB Community  
- Tailwind CSS

---

## 🧑‍💻 Author

**Chirag_Tank**  
\`Software Developer | Web Enthusiast | Automation Explorer\`  
[LinkedIn](https://www.linkedin.com/in/chirag-tank-72220919b/) | [GitHub](https://github.com/Chirag-Tank1971)

---
