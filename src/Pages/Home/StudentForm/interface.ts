export type TaskFormProps = {
    open: boolean;
    onClose: () => void;
    onAddTask: (task: Task) => void;
    studentCurrentData?:any
  };
  
  export type Task = {
    id?: string;
    title: string;
    description: string;
    status?:TaskStatusType
      userId:string|number
  };
  export type TaskStatusType="pending"|"completed"