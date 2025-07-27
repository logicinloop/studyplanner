import { getTasks, saveTasks } from "../data/tasks";

// When submitting form:
const handleSubmit = () => {
  const newTask = {
    id: Date.now(),
    title,
    dueDate,
    status: "pending",
    subject,
  };

  const updatedTasks = [...getTasks(), newTask];
  saveTasks(updatedTasks);
  // navigate or show success
};
