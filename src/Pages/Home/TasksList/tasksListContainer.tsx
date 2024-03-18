import React from "react";
import { Task } from "../TaskForm/interface";
import "./styles.scss";
import {useSelector} from "react-redux";
import TaskCard from "./TaskCard/taskCardContainer";
import useUrlParams from "../../../Hooks/URL/useUrl";



const TasksList: React.FC<{tasks:Task[]}> = ({tasks}) => {
  const {getParam} = useUrlParams()
  
  const filterBy=getParam("filter")

  const filterdTasks=()=>{
      return !!filterBy ? tasks?.filter((item:any)=>item?.status==filterBy):tasks
  }

  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {filterdTasks().map((task: Task) => <TaskCard task={task}/>)}

    </div>
  );
};

export default TasksList;
