const fastify = require("fastify")({ logger: true });

let tasks = [
  { id: 1, title: "", completed: false },
  { id: 2, title: "Build REST API", completed: false }
];

// GET /tasks
fastify.get("/tasks", async (req, reply) => {
  return tasks;
});

// POST /tasks
fastify.post("/tasks", async (req, reply) => {
  const { title, completed } = req.body;
  if (!title) {
    reply.code(400);
    return { error: "Title is required" };
  }

  const newTask = { id: tasks.length + 1, title, completed: completed || false };
  tasks.push(newTask);

  reply.code(201);
  return newTask;
});

// PUT /tasks/:id
fastify.put("/tasks/:id", async (req, reply) => {
  const id = parseInt(req.params.id);
  const task = tasks.find(t => t.id === id);

  if (!task) {
    reply.code(404);
    return { error: "Task not found" };
  }

  const { title, completed } = req.body;
  if (title) task.title = title;
  if (completed !== undefined) task.completed = completed;

  return task;
});

// DELETE /tasks/:id
fastify.delete("/tasks/:id", async (req, reply) => {
  const id = parseInt(req.params.id);
  tasks = tasks.filter(t => t.id !== id);
  return { message: "Task deleted" };
});

// Start server
const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
    console.log(`🚀 Fastify server running on http://localhost:3000`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
