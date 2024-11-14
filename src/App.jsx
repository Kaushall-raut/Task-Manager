import { useState, useEffect } from "react";
import {TaskForm} from "./TaskForm";
import {TaskList} from "./TaskList";
import {SearchBar} from "./SearchBar";

export const App = () => {
  // ! this section contains code for task initialising 
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [filteredTasks, setFilteredTasks] = useState(tasks);
  const [searchTerm, setSearchTerm] = useState("");

  // ! this section contains to code for saving the task in local storage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    handleSearch(searchTerm);
  }, [tasks]);

  //! Adding new task code
  const addTask = (task) => {
    setTasks((prevTasks) => [...prevTasks, task]);
  };

  // ! code for deleting task
  const deleteTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };


  const toggleComplete = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };


  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
    const filtered = tasks.filter((task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTasks(filtered);
  };

//!logic for sorting
  const handleSort = (sortType) => {
    let sortedTasks = [...tasks];
    if (sortType === "priority") {
      const priorityOrder = { High: 3, Medium: 2, Low: 1 };
      sortedTasks.sort(    (a, b) => priorityOrder[b.priorityLevel] - priorityOrder[a.priorityLevel]  ); 
    } else if (sortType === "completed") {
      sortedTasks.sort((a, b) => Number(b.completed) - Number(a.completed)); 
    } else if (sortType === "date") {
      sortedTasks.sort((a, b) => new Date(b.date) - new Date(a.date)); 
    }
    setTasks(sortedTasks);  
    setFilteredTasks(sortedTasks);
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


