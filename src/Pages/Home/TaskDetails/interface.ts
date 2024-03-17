import { Task } from "../TaskForm/interface";

export interface ITaskDetailsProps{
    open:boolean, onClose:()=>void, task ?:Task
}