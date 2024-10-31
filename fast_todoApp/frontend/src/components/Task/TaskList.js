import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TaskList.css';

const TaskList = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('');
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('https://fast_todoApp-backend.cloud-stacks.com/api/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Failed to fetch tasks');
    }
  };

  const handleAddTask = async () => {
    if (title && description && dueDate && priority) {
      const newTask = {
        title,
        description,
        dueDate,
        priority,
      };
      try {
        const response = await axios.post('https://fast_todoApp-backend.cloud-stacks.com/api/tasks', newTask, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        setTasks([...tasks, response.data]);
        setTitle('');
        setDescription('');
        setDueDate('');
        setPriority('');
      } catch (error) {
        console.error('Failed to add task');
      }
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await axios.delete(`https://fast_todoApp-backend.cloud-stacks.com/api/tasks/${id}`);
      setTasks(tasks.filter(task => task.id !== id));
    } catch (error) {
      console.error('Failed to delete task');
    }
  };

  return (
    <div className="task-list-container">
      <div className="task-creation-form">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="">Select Priority</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <button onClick={handleAddTask}>Save Task</button>
      </div>
      <div className="task-list">
        {tasks.map((task) => (
          <div key={task.id} className="task-item">
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>Due: {task.dueDate}</p>
            <p>Priority: {task.priority}</p>
            <button onClick={() => handleDeleteTask(task.id)}>Delete Task</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;
