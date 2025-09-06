🧪 README.md — Selenium UI Test Suite
🎯 Purpose
This test suite automates UI testing for the Halleyx Task Manager frontend. It verifies core user flows such as task fetching, DOM rendering, and status badge display using Selenium WebDriver.

📁 File Location
Code
tests/
└── selenium/
    └── test_ui.py
🛠️ Tech Stack
Tool	Purpose
Python	Test scripting language
Selenium	UI automation
ChromeDriver	Browser automation backend
pytest	Optional: test runner framework
🚀 Setup Instructions
Install dependencies

bash
pip install selenium
Download ChromeDriver Match your Chrome version: https://chromedriver.chromium.org/downloads Place it in your system PATH or specify its location in the script.

Start the backend server Make sure your Node.js backend is running at http://localhost:3000.

Open the frontend Serve index.html locally (e.g., using Live Server or Python’s HTTP server).

🧪 What It Tests
Test Case	Description
Page Load	Verifies that the frontend loads without errors
Fetch Button Click	Simulates clicking the "Fetch Tasks" button
Task List Rendering	Checks if tasks are rendered as list items
Status Badge Verification	Confirms correct badge (Completed or Pending) per task
Error Handling	Validates alert display when backend is unreachable
📄 Sample Test Snippet
python
from selenium import webdriver
from selenium.webdriver.common.by import By
import time

driver = webdriver.Chrome()
driver.get("http://127.0.0.1:5500/html-css/index.html")

fetch_btn = driver.find_element(By.ID, "fetchDataBtn")
fetch_btn.click()

time.sleep(2)  # Wait for tasks to load

tasks = driver.find_elements(By.CLASS_NAME, "list-group-item")
assert len(tasks) > 0, "No tasks rendered"

for task in tasks:
    badge = task.find_element(By.CLASS_NAME, "badge")
    assert badge.text in ["Completed", "Pending"]

driver.quit()
🧠 Notes
Use data-testid attributes in HTML for more reliable selectors

Add try/except blocks for graceful error handling

Integrate with CI tools like GitHub Actions for automated test runs

Extend tests to cover task creation, deletion, and edge cases