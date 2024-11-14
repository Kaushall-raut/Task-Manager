import  { useState } from "react";

export const TaskForm = ({ addTask }) => {
  const [title, setTitle] = useState("");
  const [priorityLevel, setPriorityLevel] = useState("Low");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      addTask({
        id: Date.now(),
        title,
        priorityLevel,
        completed: false,
        date: new Date().toISOString(),
      });
      setTitle("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col md:flex-row gap-3 mb-4 animate-slide-in"
    >
      <input
        type="text"
        placeholder="Add new task"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="input input-bordered w-full md:w-2/3 transition-all focus:ring-2 focus:ring-primary"
      />
    
      <select
        value={priorityLevel}
        onChange={(e) => setPriorityLevel(e.target.value)}
        className="select select-bordered w-full md:w-1/4"
      >
        <option value="Low">Low Priority</option>
        <option value="Medium">Medium priority</option>
        <option value="High">High Priority</option>
      </select>
      <button
        type="submit"
        className="btn btn-primary w-full md:w-1/5 hover:scale-105 transition-transform"
      >
        Add Task
      </button>
    </form>
  );
};

