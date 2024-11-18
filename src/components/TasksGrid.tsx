import { useEffect } from "react";
import { useTaskStore } from "../hooks";
import { TaskCard } from "./TaskCard";




export const TasksGrid = () => {

  const { tasks, startLoadingTasks } = useTaskStore();

  useEffect(() => {
    startLoadingTasks();
  }, [])

  return (
    <div className="w-full p-2 sm:w-[50%] mx-auto flex flex-col my-4">
      {
        tasks?.map((task) => (
          <TaskCard {...task} />
        ))
      }
    </div>
  )
}
