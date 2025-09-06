
🎨 README.md — Halleyx Frontend (Bootstrap Integration)
🎯 Purpose
This frontend uses Bootstrap 5 to deliver a responsive, visually clean interface for the Halleyx Task Manager. It supports dynamic task rendering, status badges, and user interactions like fetching tasks from the backend.

📁 File Structure
Code
html-css/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
└── README.md
🛠️ Tech Stack
Tool	Purpose
Bootstrap 5	Responsive layout & UI components
FontAwesome	Icons for buttons and badges
Custom CSS	Overrides and additional styling
Vanilla JS	DOM manipulation and API calls
📄 Key Bootstrap Features Used
Component	Usage Description
Grid System	Responsive layout for task list and buttons
List Groups	Displaying tasks as styled list items
Badges	Status indicators (Completed, Pending)
Buttons	Triggering task fetch and other actions
Alerts (optional)	Error or success feedback
🧪 Sample HTML Snippet
html
<div class="container mt-4">
  <h2 class="text-center">Halleyx Task Manager</h2>
  <button id="fetchDataBtn" class="btn btn-primary w-100 my-3">
    <i class="fas fa-sync-alt"></i> Fetch Tasks
  </button>
  <ul id="dataList" class="list-group"></ul>
</div>
🎨 Custom Styling (style.css)
Overrides Bootstrap spacing and colors for branding

Adds hover effects and transitions for task items

Supports dark mode toggle (optional)

🔗 Integration Notes
Ensure Bootstrap and FontAwesome are loaded via CDN in index.html

JavaScript (script.js) dynamically injects Bootstrap classes into DOM

Backend API must be running at http://localhost:3000/tasks

🧠 Tips for Extension
Add modals for task creation/editing

Use Bootstrap Toasts for real-time feedback

Add data-testid attributes for Selenium targeting

Consider using Bootstrap Icons if FontAwesome isn’t preferred
