import React, { useState, useEffect } from "react";

const Dashboard = () => {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [assignments, setAssignments] = useState(() => {
    const savedAssignments = localStorage.getItem("assignments");
    return savedAssignments ? JSON.parse(savedAssignments) : [];
  });

  const completedTasks = tasks.filter((t) => t.completed).length;
  const pendingTasks = tasks.length - completedTasks;

  const completedAssignments = assignments.filter((a) => a.completed).length;
  const pendingAssignments = assignments.length - completedAssignments;

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

  return (
    <div className="p-6 max-w-4xl mx-auto font-sans text-gray-900 dark:text-gray-100">
      <h1 className="text-4xl font-bold mb-6 text-purple-900 dark:text-purple-100">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Planner Task Summary */}
        <section className="bg-purple-50 dark:bg-purple-900 p-4 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-4 text-purple-700 dark:text-purple-100">Planner Tasks</h2>
          <p>Total Tasks: {tasks.length}</p>
          <p>Completed: {completedTasks}</p>
          <p>Pending: {pendingTasks}</p>

          {tasks.length > 0 && (
            <ul className="mt-4 space-y-2 max-h-48 overflow-y-auto">
              {tasks.map(({ id, title, completed }) => (
                <li
                  key={id}
                  className={`p-2 rounded ${
                    completed
                      ? "bg-purple-200 dark:bg-purple-700 line-through text-purple-800 dark:text-purple-100"
                      : "bg-purple-100 dark:bg-purple-800 text-purple-900 dark:text-purple-100"
                  }`}
                >
                  {title}
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Assignments Summary */}
        <section className="bg-purple-50 dark:bg-purple-900 p-4 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-4 text-purple-700 dark:text-purple-300">Assignments</h2>
          <p>Total Assignments: {assignments.length}</p>
          <p>Completed: {completedAssignments}</p>
          <p>Pending: {pendingAssignments}</p>

          {assignments.length > 0 && (
            <ul className="mt-4 space-y-2 max-h-48 overflow-y-auto">
              {assignments.map(({ id, title, completed, dueDate }) => (
                <li
                  key={id}
                  className={`p-2 rounded ${
                    completed
                      ? "bg-purple-200 dark:bg-purple-700 line-through text-purple-800 dark:text-purple-100"
                      : "bg-purple-100 dark:bg-purple-800 text-purple-900 dark:text-purple-100"
                  }`}
                >
                  <div className="flex justify-between">
                    <span>{title}</span>
                    <small className="italic text-purple-500 dark:text-purple-300">
                      {getTimeLeft(dueDate)}
                    </small>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

      </div>
    </div>
  );
};

export default Dashboard;
