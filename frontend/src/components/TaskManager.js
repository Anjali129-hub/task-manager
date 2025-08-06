// src/components/TaskManager.js
import React, { useState } from 'react';

export default function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  const addTask = () => {
    if (!taskInput.trim()) return;
    if (editIndex !== null) {
      // Edit existing task
      const newTasks = [...tasks];
      newTasks[editIndex] = taskInput;
      setTasks(newTasks);
      setEditIndex(null);
    } else {
      // Add new task
      setTasks([...tasks, taskInput]);
    }
    setTaskInput('');
  };

  const editTask = index => {
    setTaskInput(tasks[index]);
    setEditIndex(index);
  };

  const deleteTask = index => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <div>
      <h2>Task Manager</h2>
      <input
        type="text"
        value={taskInput}
        onChange={e => setTaskInput(e.target.value)}
        placeholder="Enter task"
      />
      <button onClick={addTask}>{editIndex !== null ? 'Update' : 'Add'}</button>

      <ul>
        {tasks.map((task, i) => (
          <li key={i}>
            {task}{' '}
            <button onClick={() => editTask(i)}>Edit</button>{' '}
            <button onClick={() => deleteTask(i)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
