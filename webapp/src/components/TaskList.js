import React, { useEffect, useState } from 'react';
import { Typography, Box, List, ListItem, ListItemText, ListItemAvatar, Avatar } from '@mui/material';
import Divider from '@mui/material/Divider';
import { CheckCircleOutline, HourglassEmpty, Cancel } from '@mui/icons-material';
import { grey } from '@mui/material/colors';

import axios from 'axios';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircleOutline style={{ color: 'green' }} />;
      case 'in_progress':
        return <HourglassEmpty style={{ color: 'blue' }} />;
      case 'pending':
        return <HourglassEmpty style={{ color: 'orange' }} />;
      default:
        return <Cancel style={{ color: 'red' }} />;
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
    <div display="flex">
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Lista de Tarefas
        </Typography>
      </Box>
      <Divider />
      <List sx={{ width: '100%', maxWidth: 360 }}>
        {tasks.map((task, index) => (
          <ListItem>
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: grey[100] }} variant="rounded">
                {getStatusIcon(task.status)}
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={task.title} secondary={task.description} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default TaskList;
