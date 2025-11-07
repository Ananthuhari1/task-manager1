import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TaskForm from '../components/TaskForm';
import TaskItem from '../components/TaskItem';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const token = localStorage.getItem('token');
    const res = await axios.get('http://localhost:5000/api/tasks', {
      headers: { Authorization: `Bearer ${token}` }
    });
    setTasks(res.data);
  };

  const addTask = async (task) => {
    const token = localStorage.getItem('token');
    await axios.post('http://localhost:5000/api/tasks', task, {
      headers: { Authorization: `Bearer ${token}` }
    });
    fetchTasks();
  };

  const deleteTask = async (id) => {
    const token = localStorage.getItem('token');
    await axios.delete(`http://localhost:5000/api/tasks/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div>
      <h2>Your Tasks</h2>
      <TaskForm onSubmit={addTask} />
      {tasks.map(task => (
        <TaskItem key={task._id} task={task} onDelete={deleteTask} />
      ))}
    </div>
  );
};

export default Dashboard;
