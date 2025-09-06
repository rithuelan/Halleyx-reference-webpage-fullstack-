const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory tasks
let tasks = [
  { id: 1, title: "Learn Express", completed: false },
  { id: 2, title: "Build REST API", completed: false }
];

// GET /tasks
app.get("/tasks", (req, res) => {
  res.json(tasks);
});

// POST /tasks
app.post("/tasks", (req, res) => {
  const { title, completed } = req.body;
  if (!title) return res.status(400).json({ error: "Title is required" });

  const newTask = { id: tasks.length + 1, title, completed: completed || false };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// PUT /tasks/:id
app.put("/tasks/:id", (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) return res.status(404).json({ error: "Task not found" });

  const { title, completed } = req.body;
  if (title) task.title = title;
  if (completed !== undefined) task.completed = completed;

  res.json(task);
});

// DELETE /tasks/:id
app.delete("/tasks/:id", (req, res) => {
  tasks = tasks.filter(t => t.id !== parseInt(req.params.id));
  res.json({ message: "Task deleted" });
});

app.listen(PORT, () => console.log(`🚀 Express server running on http://localhost:${PORT}`));
