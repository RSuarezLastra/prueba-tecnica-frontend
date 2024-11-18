import { useEffect } from "react";
import { useTaskStore } from "../hooks";
import { TaskCard } from "./TaskCard";




export const TasksGrid = () => {

  const { tasks, startLoadingTasks } = useTaskStore();

  useEffect(() => {
    startLoadingTasks();
  }, [])

  return (
    <div className="w-[50%] mx-auto flex flex-col">
      {
        tasks?.map((task) => (
          <TaskCard {...task} />
        ))
      }
    </div>
  )
}