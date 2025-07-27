import React, { useState, useEffect } from "react";

const Planner = () => {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!newTask.trim()) return;
    const task = {
      id: Date.now(),
      title: newTask.trim(),
      completed: false,
    };
    setTasks((prev) => [...prev, task]);
    setNewTask("");
  };

  const toggleCompleted = (id) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const removeTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="min-h-screen bg-purple-100 text-purple-900 p-6 font-sans max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Planner</h1>

      <div className="mb-4 flex gap-2">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add new task"
          className="flex-grow p-2 rounded border border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
        <button
          onClick={addTask}
          className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
        >
          Add
        </button>
      </div>

      {tasks.length === 0 ? (
        <p>No tasks added yet.</p>
      ) : (
        <ul className="space-y-3">
          {tasks.map(({ id, title, completed }) => (
            <li
              key={id}
              onClick={() => toggleCompleted(id)}
              className={`flex justify-between items-center p-3 rounded cursor-pointer select-none
                ${completed ? "bg-purple-300 line-through text-purple-700" : "bg-purple-200 hover:bg-purple-300"}`}
            >
              <span>{title}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeTask(id);
                }}
                aria-label={`Remove task ${title}`}
                className="text-purple-900 font-bold text-xl hover:text-red-600"
              >
                &times;
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Planner;
