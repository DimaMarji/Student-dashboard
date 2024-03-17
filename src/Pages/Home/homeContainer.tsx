import { useState } from "react";
import "./styles.scss";
import { TaskForm } from "./TaskForm";
import { Task } from "./TaskForm/interface";
import { TasksList } from "./TasksList";
import { useDispatch, useSelector } from "react-redux";
import { addTask } from "../../Redux/tasksSlice";
import { Button } from "@mui/material";
const Home: React.FC = () => {

  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const dispatch = useDispatch();
  const userData = useSelector((state: any) => state.user);
  const tasks = useSelector((state: any) => state.tasks.tasks);

  const handleOpenAddTask = () => {
    setIsAddTaskOpen(true);
  };

  const handleCloseAddTask = () => {
    setIsAddTaskOpen(false);
  };

  const handleAddTask = (task: Task) => {
    dispatch(addTask(task));
  };

  return (
    <div className={"home-page"}>
      <header className="task-content-header">
        <h1 style={{ fontSize: "24px" }}>Hi, {userData?.username}</h1>
        <Button
        variant="contained"
          color="primary"
          className={"primary-button"}
          onClick={handleOpenAddTask}
        >
          Add Task
        </Button>
      </header>
      <div>
        {tasks.length === 0 ? (
          <div>
            <img src={"/empty.jpg"} className={"empty-image"} alt="Empty state" />
            <p>No tasks yet.</p>
          </div>
        ) : (
          <TasksList />
        )}
      </div>
      <TaskForm
        open={isAddTaskOpen}
        onClose={handleCloseAddTask}
        onAddTask={handleAddTask}
      />
    </div>
  );
};
export default Home;
