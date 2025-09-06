const http = require("http");
const url = require("url");
const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);
const { MongoMemoryServer } = require("mongodb-memory-server-core");
const path = require("path");

const PORT = 3000;

// MongoDB Task Schema
const taskSchema = new mongoose.Schema({
  taskId: Number,
  title: { type: String, required: true },
  completed: { type: Boolean, default: false },
});

// Auto-increment plugin
taskSchema.plugin(AutoIncrement, { inc_field: "taskId" });

// Model declaration (this was missing!)
const Task = mongoose.model("Task", taskSchema);

// Helper function to send JSON response
const sendJSON = (res, statusCode, data) => {
  res.writeHead(statusCode, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data));
};

// Create HTTP server
const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const { pathname } = parsedUrl;

  // Enable CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    return res.end();
  }

  // GET /tasks → List all tasks
  if (pathname === "/tasks" && req.method === "GET") {
    Task.find()
      .then(tasks => sendJSON(res, 200, {
        message: "Tasks fetched successfully",
        tasks: tasks
      }))
      .catch(() => sendJSON(res, 500, { error: "Failed to fetch tasks" }));
    return;
  }

  // GET /tasks/:id → View a single task
  if (pathname.startsWith("/tasks/") && req.method === "GET") {
    const id = pathname.split("/")[2];

    Task.findById(id)
      .then(task => {
        if (!task) {
          return sendJSON(res, 404, { error: "Task not found" });
        }
        return sendJSON(res, 200, {
          message: "Task fetched successfully",
          task: task
        });
      })
      .catch(() => sendJSON(res, 500, { error: "Failed to fetch task" }));
    return;
  }

  // POST /tasks → Add a new task
  if (pathname === "/tasks" && req.method === "POST") {
    let body = "";
    req.on("data", chunk => (body += chunk));
    req.on("end", async () => {
      try {
        const newTask = JSON.parse(body);
        if (!newTask.title) {
          return sendJSON(res, 400, { error: "Title is required" });
        }

        const task = new Task({
          title: newTask.title,
          completed: newTask.completed || false,
        });

        const saved = await task.save();
        return sendJSON(res, 201, {
          message: "Task created successfully",
          task: saved
        });

      } catch (error) {
        return sendJSON(res, 400, { error: "Invalid JSON format or save error" });
      }
    });
    return;
  }

  // PUT /tasks/:id → Update a task
  if (pathname.startsWith("/tasks/") && req.method === "PUT") {
    const id = pathname.split("/")[2];
    let body = "";

    req.on("data", chunk => (body += chunk));
    req.on("end", async () => {
      try {
        const updatedData = JSON.parse(body);
        const updatedTask = await Task.findByIdAndUpdate(id, updatedData, { new: true });

        if (!updatedTask) {
          return sendJSON(res, 404, { error: "Task not found" });
        }

        return sendJSON(res, 200, {
          message: "Task updated successfully",
          task: updatedTask
        });

      } catch (error) {
        return sendJSON(res, 400, { error: "Invalid JSON format or update error" });
      }
    });
    return;
  }

  // DELETE /tasks/:id → Delete a task
  if (pathname.startsWith("/tasks/") && req.method === "DELETE") {
    const id = pathname.split("/")[2];
    Task.findByIdAndDelete(id)
      .then(deleted => {
        if (!deleted) {
          return sendJSON(res, 404, { error: "Task not found" });
        }
        return sendJSON(res, 200, {
          message: "Task deleted successfully"
        });
      })
      .catch(() => sendJSON(res, 500, { error: "Delete operation failed" }));
    return;
  }

  // Fallback for unknown routes
  sendJSON(res, 404, { error: "Route not found" });
});

// Start MongoDB Memory Server and HTTP server
(async () => {
  try {
    const mongod = await MongoMemoryServer.create({
      binary: {
        downloadDir: path.resolve(__dirname, "mongodb-binaries"),
      },
    });

    const uri = mongod.getUri();
    await mongoose.connect(uri);

    server.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });

    process.on("SIGINT", async () => {
      console.log("\n🛑 Shutting down...");
      await mongoose.disconnect();
      await mongod.stop();
      process.exit(0);
    });
  } catch (err) {
    console.error("❌ Failed to start server:", err);
  }
})();
