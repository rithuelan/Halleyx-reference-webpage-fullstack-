
📘 README.md — Halleyx Frontend Script
🎯 Purpose
This JavaScript file powers the frontend logic for the Halleyx Task Manager. It connects the UI to the backend API (http://localhost:3000), handles user interactions, and dynamically updates the DOM with task data.

📁 File Location
Code
html-css/
├── js/
│   └── script.js
🌐 Dependencies
Vanilla JavaScript (no frameworks required)

Bootstrap 5 (for styling and layout)

FontAwesome (for icons)

🔗 Backend Integration
The script communicates with the backend API running on:

Code
http://localhost:3000
Make sure the backend server is running before using the frontend.

⚙️ Features
Feature	Description
Fetch Tasks	Retrieves all tasks from backend and displays them
Dynamic Rendering	Injects task data into the DOM as styled list items
Error Handling	Displays alerts if fetch fails
Status Badges	Shows Completed or Pending using Bootstrap badges
🧪 Sample Code Snippet
js
document.getElementById("fetchDataBtn").addEventListener("click", () => {
  const dataList = document.getElementById("dataList");
  dataList.innerHTML = `<li class="list-group-item text-center">Fetching...</li>`;

  fetch("http://localhost:3000/tasks")
    .then(res => res.json())
    .then(data => {
      dataList.innerHTML = "";
      const tasks = Array.isArray(data) ? data : data.tasks;

      tasks.forEach(task => {
        const li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between align-items-center";
        li.innerHTML = `
          <span>#${task.taskId} - ${task.title}</span>
          <span class="badge bg-${task.completed ? 'success' : 'warning'}">
            ${task.completed ? 'Completed' : 'Pending'}
          </span>
        `;
        dataList.appendChild(li);
      });
    })
    .catch(error => {
      dataList.innerHTML = `<li class="list-group-item text-danger text-center">${error.message}</li>`;
    });
});
🧠 Notes
Make sure index.html includes this script at the bottom of the <body> tag

Backend must have CORS enabled (Access-Control-Allow-Origin: *)

You can extend this script to support task creation, editing, and deletion

Add data-testid attributes to HTML for easier Selenium testing
