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
import {useDispatch, useSelector} from "react-redux";
import TaskDetails from "../TaskDetails/taskDetailsContainer";
import TaskCard from "./TaskCard/taskCardContainer";



const TasksList: React.FC<TasksListProps> = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state: any) => state.tasks.tasks);


  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedTask, setSelectedTask] = useState<Task>();


  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {tasks.map((task: Task) => <TaskCard task={task}/>)}

    </div>
  );
};

export default TasksList;
