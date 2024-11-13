import React from 'react';

const TaskList = ({ tasks, deleteTask, toggleComplete }) => {
  return (
    <ul className="list-group">
      {tasks.length === 0 ? (
        <li className="list-group-item text-center">No tasks found</li>
      ) : (
        tasks.map((task) => (
          <li
            key={task.id}
            className={`list-group-item d-flex justify-content-between align-items-center ${
              task.completed ? 'list-group-item-success' : ''
            }`}
          >
            <span>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleComplete(task.id)}
                className="form-check-input me-2"
              />
              {task.title} <span className="badge bg-info ms-2">{task.priorityLevel}</span>
            </span>
            <button
              className="btn btn-danger btn-sm"
              onClick={() => deleteTask(task.id)}
            >
              Delete
            </button>
          </li>
        ))
      )}
    </ul>
  );
};

export default TaskList;
