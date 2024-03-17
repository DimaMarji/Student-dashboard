import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardActions,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Task, TaskStatusType } from "../TaskForm/interface";
import "./styles.scss";
import { deleteTask, updateTask } from "../../../Redux/tasksSlice";
import { useDispatch } from "react-redux";
import TaskDetails from "../TaskDetails/taskDetailsContainer";

type TasksListProps = {
  tasks: Task[];
};

const TasksList: React.FC<TasksListProps> = ({ tasks }) => {
  const dispatch = useDispatch();

  const [isTaskDetailsOpen, setIsTaskDetailsOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedTask, setSelectedTask] = useState<Task>();

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    task: Task
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedTask(task);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedTask(undefined);
  };

  const handleStatusChange = (status: TaskStatusType) => {
    if (selectedTask) {
      dispatch(updateTask({ ...selectedTask, status: status }));
    }
    handleClose();
  };

  const handleDeleteTask = () => {
    if (selectedTask) dispatch(deleteTask(selectedTask.id));

    handleClose();
  };

  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {tasks.map((task: Task) => (
        <Card
          onClick={(event) => {
            setIsTaskDetailsOpen(true)
            setAnchorEl((event.currentTarget))
          }}
          className="task-card"
          key={task.id}
          sx={{ width: { xs: "100%", sm: "50%", md: "50%", lg: "33.33%" } }}
          style={{ margin: "8px" }}
        >
          <CardHeader
            title={task.title}
            subheader={task.description}
            action={
              <IconButton
                aria-label="more"
                aria-controls="task-menu"
                aria-haspopup="true"
                onClick={(event) => handleClick(event, task)}
              >
                <MoreVertIcon />
              </IconButton>
            }
          />
          <CardActions>
            <Typography variant="body2">
              Status: {selectedTask?.status}
            </Typography>
          </CardActions>
        </Card>
      ))}
      <Menu
        id="task-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => handleStatusChange("completed")}>
          Mark as Complete
        </MenuItem>
        <MenuItem onClick={handleDeleteTask}>Delete</MenuItem>
      </Menu>
      {isTaskDetailsOpen && (
        <TaskDetails
          open={isTaskDetailsOpen}
          onClose={() => {
            setIsTaskDetailsOpen(false);
          }}
          task={selectedTask}
        />
      )}
    </div>
  );
};

export default TasksList;
