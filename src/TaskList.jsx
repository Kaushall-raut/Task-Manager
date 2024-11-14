import React from "react";
import { MdDeleteForever } from "react-icons/md";
const TaskList = ({ tasks, deleteTask, toggleComplete }) => {
  return (
    <ul className="space-y-3">
      {tasks.length === 0 ? (
        <li className="text-center text-gray-500">No tasks found</li>
      ) : (
        tasks.map((task) => (
          <li
            key={task.id}
            className={`flex justify-between items-center p-4 rounded-lg shadow-md transition-transform duration-300 ${
              task.completed ? "bg-green-100 line-through" : "bg-base-100"
            } hover:scale-105 animate-fade-in`}
          >
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleComplete(task.id)}
                className="checkbox checkbox-primary"
              />
              <span
                className={`flex-1 text-lg ${
                  task.completed ? "text-black" : "text-white"
                }`}
              >
                {task.title}
              </span>
              <span
                className={`badge ${
                  task.priorityLevel === "High"
                    ? "badge-error"
                    : task.priorityLevel === "Medium"
                    ? "badge-warning"
                    : "badge-success"
                } animate-bounce`}
              >
                {task.priorityLevel}
              </span>
            </div>
            <button
              onClick={() => deleteTask(task.id)}
              className="btn btn-sm btn-error hover:bg-red-600 hover:scale-105 transition-transform text-2xl"
            >
          <MdDeleteForever />
            </button>
          </li>
        ))
      )}
    </ul>
  );
};

export default TaskList;
