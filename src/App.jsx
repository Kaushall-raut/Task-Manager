import React, { useState, useEffect } from "react";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import SearchBar from "./SearchBar";

const App = () => {
  // Initialize tasks from localStorage
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [filteredTasks, setFilteredTasks] = useState(tasks);
  const [searchTerm, setSearchTerm] = useState("");

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    handleSearch(searchTerm); // Reapply search after tasks update
  }, [tasks]);

  // Add a new task
  const addTask = (task) => {
    setTasks((prevTasks) => [...prevTasks, task]);
  };

  // Delete a task
  const deleteTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  // Toggle task completion
  const toggleComplete = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Handle task search
  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
    const filtered = tasks.filter((task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTasks(filtered);
  };

  // Sort tasks by selected criteria
  const handleSort = (sortType) => {
    let sortedTasks = [...tasks];
    if (sortType === "priority") {
      const priorityOrder = { High: 3, Medium: 2, Low: 1 };
      sortedTasks.sort(    (a, b) => priorityOrder[b.priorityLevel] - priorityOrder[a.priorityLevel]  ); // Sort by priority
    } else if (sortType === "completed") {
      sortedTasks.sort((a, b) => Number(b.completed) - Number(a.completed)); // Sort by completed status
    } else if (sortType === "date") {
      sortedTasks.sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort by date
    }
    setTasks(sortedTasks);  // Update tasks state
    setFilteredTasks(sortedTasks);  // Update filtered tasks state
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto p-4 bg-white rounded-xl shadow-lg shadow-blue-800">
        <h1 className="text-3xl font-bold text-center text-primary mb-4 text-5xl">
          Task Manager
        </h1>
        <TaskForm addTask={addTask} />
        <SearchBar onSearch={handleSearch} onSort={handleSort} />
        <TaskList
          tasks={filteredTasks}
          deleteTask={deleteTask}
          toggleComplete={toggleComplete}
        />
      </div>
    </div>
  );
};

export default App;
