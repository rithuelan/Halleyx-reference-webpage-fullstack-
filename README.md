# 🚀 Halleyx Task Manager — Fullstack Project

A modular fullstack task management application built with HTML, Bootstrap, Node.js, and MongoDB. It features a responsive frontend, a RESTful backend API, and automated UI testing with Selenium. Designed for clarity, scalability, and team collaboration.

---

## 📦 Project Structure

HALLEYX-TASK/ ├── html-css/ # 🌐 Frontend UI │ ├── index.html # Main webpage │ ├── css/ # Custom styles │ ├── assets/ # Logo, video, audio │ └── js/ # Frontend logic (script.js)

├── mongo-api/ # 🔧 Backend API (Node.js + MongoDB) │ ├── server.js # Main backend entry point │ ├── package.json # Backend dependencies │ ├── .env # Reserved for future configs │ └── Halleyx-API.postman_collection.json # API test suite

├── js/server/ # 🧠 Optional Express/Fastify variants │ ├── express-server.js │ └── fastify-server.js

├── tests/selenium/ # 🧪 UI automation │ ├── test_create_task.py │ ├── test_delete_task.py │ └── test_update_task.py

└── README.md # Project documentation

Code

---

## 🛠️ Tech Stack

| Layer     | Tools Used                                      |
|-----------|--------------------------------------------------|
| Frontend  | HTML, CSS, Bootstrap 5, FontAwesome, Vanilla JS |
| Backend   | Node.js (native `http`), MongoDB (in-memory), Mongoose |
| Testing   | Selenium WebDriver (Python), ChromeDriver       |

---

## 🌐 Backend API (`server.js`)

### Base URL
http://localhost:3000

Code

### Endpoints

| Method | Endpoint         | Description                      |
|--------|------------------|----------------------------------|
| GET    | `/tasks`         | Fetch all tasks                  |
| GET    | `/tasks/:id`     | Fetch task by Mongo `_id`        |
| POST   | `/tasks`         | Create a new task                |
| PUT    | `/tasks/:id`     | Update task by `_id`             |
| DELETE | `/tasks/:id`     | Delete task by `_id`             |

🧪 Selenium UI Testing (tests/selenium/)
Setup
bash
pip install selenium
Run a test
bash
python tests/selenium/test_create_task.py
What it tests
Page load and button click

Task rendering and badge verification

Error handling when backend is offline

Sample Test Snippet
python
from selenium import webdriver
from selenium.webdriver.common.by import By
import time

driver = webdriver.Chrome()
driver.get("http://127.0.0.1:5500/html-css/index.html")

driver.find_element(By.ID, "fetchDataBtn").click()
time.sleep(2)

tasks = driver.find_elements(By.CLASS_NAME, "list-group-item")
assert len(tasks) > 0, "No tasks rendered"

driver.quit()
⚙️ Running the Project
1. Start the backend
bash
cd mongo-api
node server.js
2. Serve the frontend
bash
cd html-css
python -m http.server 5500
3. Open in browser
Code
http://localhost:5500/index.html
📚 API Testing (Postman)
Import Halleyx-API.postman_collection.json

Test all endpoints with prebuilt requests

Validate success messages and error handling

🧠 Developer Notes
Auto-incrementing taskId via mongoose-sequence

In-memory MongoDB for fast local testing

CORS enabled for frontend-backend communication

Modular structure supports Express/Fastify alternatives

Extendable with task creation/editing forms, toast alerts, and dark mode
