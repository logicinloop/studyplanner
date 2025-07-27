import React, { useState, useEffect } from "react";

const Assignments = () => {
  const [assignments, setAssignments] = useState(() => {
    const saved = localStorage.getItem("assignments");
    return saved ? JSON.parse(saved) : [];
  });

  const [newAssignment, setNewAssignment] = useState("");
  const [newDueDate, setNewDueDate] = useState("");

  useEffect(() => {
    localStorage.setItem("assignments", JSON.stringify(assignments));
  }, [assignments]);

  const getTimeLeft = (dueDate) => {
    if (!dueDate) return "No due date";

    const now = new Date();
    const due = new Date(dueDate);
    const diff = due - now;

    if (diff <= 0) return "Due!";

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);

    return `${days}d ${hours}h ${minutes}m left`;
  };

  const addAssignment = () => {
    if (!newAssignment.trim()) return;
    const assignment = {
      id: Date.now(),
      title: newAssignment.trim(),
      completed: false,
      dueDate: newDueDate || null,
    };
    setAssignments((prev) => [...prev, assignment]);
    setNewAssignment("");
    setNewDueDate("");
  };

  const toggleCompleted = (id) => {
    setAssignments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, completed: !a.completed } : a))
    );
  };

  const removeAssignment = (id) => {
    setAssignments((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <div className="min-h-screen bg-purple-100 text-purple-900 p-6 font-sans max-w-xl mx-auto">

      <h1 className="text-3xl font-bold mb-6">Assignments</h1>

      <div className="mb-6 flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          value={newAssignment}
          onChange={(e) => setNewAssignment(e.target.value)}
          placeholder="New assignment"
          className="flex-grow p-2 rounded border border-purple-300 focus:outline-purple-500"
        />
        <input
          type="datetime-local"
          value={newDueDate}
          onChange={(e) => setNewDueDate(e.target.value)}
          className="p-2 rounded border border-purple-300 focus:outline-purple-500"
        />
        <button
          onClick={addAssignment}
          className="bg-purple-600 text-white px-4 rounded hover:bg-purple-700 transition"
        >
          Add
        </button>
      </div>

      {assignments.length === 0 ? (
        <p>No assignments added yet.</p>
      ) : (
        <ul className="space-y-4">
          {assignments.map(({ id, title, completed, dueDate }) => (
            <li
              key={id}
              onClick={() => toggleCompleted(id)}
              className={`flex justify-between items-center p-4 rounded cursor-pointer select-none
                ${
                  completed
                    ? "bg-green-100 text-green-800 line-through"
                    : "bg-purple-200 text-purple-900"
                }`}
            >
              <div>
                <div>{title}</div>
                <small>{getTimeLeft(dueDate)}</small>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeAssignment(id);
                }}
                className="text-red-600 font-bold text-xl hover:text-red-800"
                aria-label={`Remove assignment ${title}`}
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

export default Assignments;
