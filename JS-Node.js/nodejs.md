🚀 README.md — Halleyx Task Manager Backend (server.js)
🎯 Purpose
This Node.js server provides a lightweight REST API for managing tasks in the Halleyx Task Manager. It uses the native http module, integrates with MongoDB via Mongoose, and supports full CRUD operations with clean, frontend-friendly responses.

🛠️ Tech Stack
Tool	Purpose
Node.js (native http)	Core server logic
MongoDB (in-memory)	Fast, ephemeral database for testing
Mongoose	ODM for schema and queries
mongoose-sequence	Auto-incrementing taskId field
mongodb-memory-server	Spins up MongoDB locally for dev use
📁 File Structure
Code
mongo-api/
├── server.js                 # Main backend entry point
├── package.json              # Dependencies and scripts
├── .env                      # Reserved for future configs
├── README.md                 # You're reading it!
└── Halleyx-API.postman_collection.json  # Postman test suite
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
⚙️ Running the Server
Install dependencies

bash
npm install
Start the server

bash
node server.js
Access the API

Code
http://localhost:3000/tasks
✅ Features
Auto-incrementing taskId using mongoose-sequence

In-memory MongoDB for fast local testing

CORS enabled for frontend integration

Minimal success messages for clean UX

Modular route handling via native http logic

🧪 Testing
Use Postman or curl to test endpoints

Import Halleyx-API.postman_collection.json for prebuilt requests

Extend with automated tests using jest, supertest, or tap

🧠 Notes
This setup is ideal for prototyping and frontend integration

For production, switch to MongoDB Atlas and use Express or Fastify

You can modularize routes and models for better scalability