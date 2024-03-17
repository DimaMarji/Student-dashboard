import React from 'react';
import { Drawer, Typography } from '@mui/material';
import { ITaskDetailsProps } from './interface';

const TaskDetails: React.FC<ITaskDetailsProps> = ({ open, onClose, task }) => {
  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <div style={{ padding: '16px' }}>
        <Typography variant="h6" gutterBottom>
          View Task
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Title: {task?.title}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Description: {task?.description}
        </Typography>
      </div>
    </Drawer>
  );
};

export default TaskDetails;