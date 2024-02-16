import React, { useEffect, useState } from 'react';
import { Typography, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import { CheckCircleOutline, HourglassEmpty, Cancel } from '@mui/icons-material';
import axios from 'axios';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircleOutline />;
      case 'in_progress':
        return <HourglassEmpty />;
      case 'pending':
        return <HourglassEmpty />;
      default:
        return null;
    }
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:3000/tasks');
        setTasks(response.data);
      } catch (error) {
        console.error('Erro ao carregar as tasks:', error);
      }
    };

    fetchTasks();

  }, []);

  return (
    <div>
      <div>
        <Typography variant="h4" gutterBottom>
          Lista de Tarefas
        </Typography>
      </div>
      <List>
        {tasks.map((task, index) => (
          <ListItem key={index}>
            <ListItemIcon>
            {getStatusIcon(task.status)}
            </ListItemIcon>
            <ListItemText primary={task.title} />
            <ListItemText primary={task.description} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default TaskList;
