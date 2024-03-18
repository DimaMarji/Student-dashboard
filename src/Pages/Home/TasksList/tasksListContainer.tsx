import React from "react";
import { Task } from "../TaskForm/interface";
import "./styles.scss";
import {useSelector} from "react-redux";
import TaskCard from "./TaskCard/taskCardContainer";
import useUrlParams from "../../../Hooks/URL/useUrl";



const TasksList: React.FC = () => {
  const {getParam} = useUrlParams()
  const tasks:Task[] = useSelector((state: any) => state.tasks.tasks);
  const filterBy=getParam("filter")

  const filterdTasks=()=>{
      return !!filterBy ? tasks?.filter((item)=>item?.status==filterBy):tasks
  }
  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {filterdTasks().map((task: Task) => <TaskCard task={task}/>)}

    </div>
  );
};

export default TasksList;
