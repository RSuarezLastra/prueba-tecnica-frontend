import { useEffect } from "react";
import { useTaskStore } from "../hooks";
import { TaskCard } from "./TaskCard";

interface Task {
  _id: string;
  title: string;
  description: string;
  status: string;
  user?: string;
}


export const TasksGrid = () => {

  const { tasks, startLoadingTasks } = useTaskStore();

  useEffect(() => {
    startLoadingTasks();
  }, [])

  return (
    <div className="w-full p-2 md:w-[50%] mx-auto flex flex-col my-4 gap-2">
      {
        tasks?.map((task: Task) => (
          <TaskCard key={task._id} {...task} />
        ))
      }
    </div>
  )
}
