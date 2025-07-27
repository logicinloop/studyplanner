import { getTasks, saveTasks } from "../data/tasks";

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
 
};
