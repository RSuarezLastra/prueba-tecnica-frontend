import { useDispatch } from "react-redux";
import { apiClient } from "../api/apiClient";
import { useAppSelector } from "../store";
import { onAddNewTask } from "../store/tasksSlice";
import Swal from "sweetalert2";

interface Task {
  id?: string;
  title: string;
  description: string;
  status: string;
  user?: string;
}

export const useTaskStore = () => {

  const dispatch = useDispatch();

  const { tasks } = useAppSelector(state => state.task);
  const { user } = useAppSelector(state => state.auth);

  const startSavingTask = async (task: Task) => {

    try {
      const { data } = await apiClient.post('/tasks/new', task);

      if (data && data.task && data.task.id) {
        const newTask = {
          ...task,
          id: data.task.id,
          user: user ? user.id : ''
        };
        dispatch(onAddNewTask(newTask));

      } else {
        console.error("No se pudo obtener un ID de la respuesta de la API");
      }
    } catch (error) {
      console.log(error);
      
    }
  }


  return {
    tasks,

    startSavingTask,
  }
}