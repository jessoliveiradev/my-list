import React, { Fragment, useEffect, useState } from 'react';
import { List, ListItemText, ListItemAvatar, Avatar, Box } from '@mui/material';
import Card from '@mui/material/Card';
import { CheckCircleOutline, HourglassEmpty, Cancel } from '@mui/icons-material';
import { grey } from '@mui/material/colors';
import AppBarComponent from '../../components/AppBar/index';

import axios from 'axios';

const TasksList = () => {
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
        console.log(response.data);
        setTasks(response.data);
      } catch (error) {
        console.error('Erro ao carregar as tasks:', error);
      }
    };

    fetchTasks();

  }, []);

  return (
    <Fragment>
      <AppBarComponent></AppBarComponent>
      <Box mt={2} ml={2} mr={2}>
        <List sx={{ width: '100%', maxWidth: 360 }}>
          {tasks.map((task, index) => (
            <Card sx={{ marginBottom: 2, paddingLeft: 2 }}>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: grey[100] }} variant="rounded">
                  {getStatusIcon(task.status)}
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={task.title} secondary={task.description} />
            </Card>
          ))}
        </List>
      </Box>
    </Fragment>
  );
};

export default TasksList;
