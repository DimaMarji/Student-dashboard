import React from 'react';
import {Divider, Drawer, Typography} from '@mui/material';
import { ITaskDetailsProps } from './interface';
import "./styles.scss"

const TaskDetails: React.FC<ITaskDetailsProps> = ({ open, onClose, task }) => {
  return (
    <Drawer className={"task-details"}  anchor="right" open={open} onClose={onClose}>
      <div style={{ padding: '16px',display: "grid" }}>
        <Typography variant="h6" gutterBottom color={"#5f5eaa"}>
          View Task
        </Typography>
        <Divider className={"divider"}/>
        <div className={"title-section"}>
        <Typography variant="h6" gutterBottom>
          Title
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
        {task?.title}
        </Typography>
        </div>
        <Typography variant="h6" gutterBottom>
          Description
        </Typography>

        <Typography variant="subtitle1" gutterBottom>
       {task?.description}
        </Typography>
      </div>
    </Drawer>
  );
};

export default TaskDetails;