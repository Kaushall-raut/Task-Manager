import React, { useState } from 'react';

const TaskForm = ({ addTask }) => {
  const [title, setTitle] = useState('');
  const [priorityLevel, setPriorityLevel] = useState('Low');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      const newTask = {
        id: Date.now(),
        title,
        priorityLevel,
        completed: false,
        date: new Date().toISOString(),
      };
      addTask(newTask);
      setTitle('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-3">
      <div className="input-group mb-2">
        <input
          type="text"
          className="form-control"
          placeholder="Add new task"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <select
          className="form-select"
          value={priorityLevel}
          onChange={(e) => setPriorityLevel(e.target.value)}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <button type="submit" className="btn btn-secondary">
          Add Task
        </button>
        <button className="btn btn-secondary">Secondary</button>
      </div>
    </form>
  );
};

export default TaskForm;
