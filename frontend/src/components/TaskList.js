import React, { useEffect, useState } from 'react';
import API from '../api';

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    API.get('tasks/', {
      headers: {
        Authorization: `Token ${token}`
      }
    }).then(res => setTasks(res.data));
  }, []);

  return (
    <div>
      <h2>Tasks</h2>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>{task.title} - {task.completed ? "✅" : "❌"}</li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
