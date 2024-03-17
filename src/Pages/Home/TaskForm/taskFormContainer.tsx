import React, { useState } from 'react';
import {
  Button,
  Drawer,
  FormControl,
  FormLabel,
  TextField,
  Typography,
} from '@mui/material';
import { Task, TaskFormProps } from './interface';
import "./styles.scss"



const TaskForm: React.FC<TaskFormProps> = ({ open, onClose, onAddTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
  };

  const handleAddTask = () => {
    const newTask: Task = {
      title,
      description,
    };
    onAddTask(newTask);
    setTitle('');
    setDescription('');
    onClose();
  };

  return (
    <Drawer className={"task-form-drawer"} anchor="right" open={open} onClose={onClose} >
      <div style={{ padding: '24px 32px' }}>
        <Typography variant="h6" gutterBottom>
          Add Task
        </Typography>
        <FormControl fullWidth margin="normal">
          <FormLabel>Title</FormLabel>
          <TextField value={title} onChange={handleTitleChange} />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <FormLabel>Description</FormLabel>
          <TextField
            value={description}
            onChange={handleDescriptionChange}
            multiline
            rows={4}
          />
        </FormControl>
        <Button variant="contained" color="primary" className={"primary-button"} onClick={handleAddTask}>
          Add
        </Button>
      </div>
    </Drawer>
  );
};

export default TaskForm;