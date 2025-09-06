from selenium import webdriver
from selenium.webdriver.common.by import By
import time

driver = webdriver.Chrome()
driver.get("http://localhost:3000/html-css/index.html")

# Click "Fetch Data" button
driver.find_element(By.ID, "fetchDataBtn").click()
time.sleep(2)

# Verify tasks are loaded
tasks = driver.find_elements(By.CLASS_NAME, "task-card")
assert len(tasks) > 0, "No tasks found"

driver.quit()
