import {Card, CardActions, CardHeader, IconButton, Menu, MenuItem, Typography} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import React, {useState} from "react";
import TaskDetails from "../../TaskDetails/taskDetailsContainer";
import {Task, TaskStatusType} from "../../TaskForm/interface";
import {deleteTask, updateTask} from "../../../../Redux/tasksSlice";
import {useDispatch} from "react-redux";

const TaskCard: React.FC = ({task}) => {
    const dispatch = useDispatch();

    const [isTaskDetailsOpen, setIsTaskDetailsOpen] = useState(false);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);


    const handleClick = (
        event: React.MouseEvent<HTMLButtonElement>,
        task: Task
    ) => {
        event.stopPropagation();
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
        // setSelectedTask(undefined);
        // setOpenTaskMenu(false)
    };

    const handleStatusChange = (status: TaskStatusType) => {
        dispatch(updateTask({...task, status: status}));
        handleClose();
    };

    const handleDeleteTask = () => {
        dispatch(deleteTask(task?.id));

        handleClose();
    };


    return <><Card
        onClick={(event) => {
            setIsTaskDetailsOpen(true)
            // setAnchorEl((event.currentTarget))
        }}
        className="task-card"
        key={task.id}
        sx={{width: {xs: "100%", sm: "50%", md: "50%", lg: "33.33%"}}}
        style={{margin: "8px"}}
    >
        <CardHeader
            title={task.title}
            subheader={task.description}
            action={
                <IconButton
                    tabIndex={6}
                    aria-label="more"
                    aria-controls="task-menu"
                    aria-haspopup="true"
                    onClick={(event) => handleClick(event, task)}
                >
                    <MoreVertIcon/>
                </IconButton>
            }
        />
        <CardActions>
            <Typography variant="body2">
                Status: {task?.status}
            </Typography>
        </CardActions>
    </Card>

        <Menu
            id="task-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
        >
            <MenuItem disabled={task.status=="completed"} onClick={() => handleStatusChange("completed")}>
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
                task={task}
            />
        )}
    </>
}

export default TaskCard