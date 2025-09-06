
📘 README.md — Halleyx Task API (MongoDB)
🚀 Overview
This is the backend API for the Halleyx Task Manager, built with Node.js, MongoDB, and Mongoose. It supports full CRUD operations for managing tasks, with auto-incrementing taskIds and clean success messages for frontend integration.

📦 Tech Stack
Node.js — HTTP server

MongoDB — In-memory database via mongodb-memory-server

Mongoose — ODM for schema and queries

mongoose-sequence — Auto-increment plugin for taskId

📁 Folder Structure
Code
mongo-api/
├── server.js                   # Main backend entry point
├── package.json                # Dependencies and scripts
├── .env                        # Reserved for future configs
├── README.md                   # You're reading it!
└── Halleyx-API.postman_collection.json  # Postman test suite
⚙️ Setup Instructions
1. Install dependencies
bash
npm install
2. Run the server
bash
node server.js
Server will start at:

Code
http://localhost:3000
🔗 API Endpoints
Method	Endpoint	Description
GET	/tasks	Fetch all tasks
GET	/tasks/:id	Fetch task by Mongo _id
POST	/tasks	Create a new task
PUT	/tasks/:id	Update task by _id
DELETE	/tasks/:id	Delete task by _id
🧾 Sample Request
POST /tasks
json
{
  "title": "Design homepage",
  "completed": false
}
Response
json
{
  "message": "Task created successfully",
  "task": {
    "taskId": 1,
    "title": "Design homepage",
    "completed": false,
    "_id": "64f8c2e9f1a2b3c4d5e6f7g8"
  }
}
