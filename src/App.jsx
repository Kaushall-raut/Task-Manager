import React, { useState, useEffect } from "react";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import SearchBar from "./SearchBar";
import './index.css';
const App = () => {
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortCriteria, setSortCriteria] = useState("");

  // Load tasks from local storage
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
  }, []);

  // Save tasks to local storage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleSort = (criteria) => {
    setSortCriteria(criteria);
  };

  const filteredTasks = tasks
    .filter((task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortCriteria === "priority") {
        return a.priorityLevel.localeCompare(b.priorityLevel);
      }
      if (sortCriteria === "completed") {
        return a.completed - b.completed;
      }
      return new Date(b.date) - new Date(a.date);
    });

  return (
    <div className="container mt-5">
      <h2 className="text-center text-blue-500">Task Manager</h2>
      <TaskForm addTask={addTask} />
      <SearchBar onSearch={handleSearch} onSort={handleSort} />
      <TaskList
        tasks={filteredTasks}
        deleteTask={deleteTask}
        toggleComplete={toggleComplete}
      />
    </div>
  );
};

export default App;
