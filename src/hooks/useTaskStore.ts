import { useDispatch } from "react-redux";
import { apiClient } from "../api/apiClient";
import { useAppSelector } from "../store";
import { onAddNewTask, onDeleteTask, onLoadTask } from "../store/tasksSlice";
import Swal from "sweetalert2";

interface Task {
  _id?: string;
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

      if (data && data.task && data.task._id) {
        const newTask = {
          ...task,
          _id: data.task._id,
          user: user ? user.id : ''
        };
        dispatch(onAddNewTask(newTask));

        Swal.fire('Tarea guardada', 'Creado exitosamente', 'success');

      } else {
        console.error("No se pudo obtener un ID de la respuesta de la API");
      }
    } catch (error) {
      console.log(error);

    }
  }

  const startDeletingTask = async (id: string) => {
    try {
      await apiClient.delete(`/tasks/delete/${id}`);
      dispatch(onDeleteTask(id))
    } catch (error) {
      console.log(error);
    }
  }

  const startLoadingTasks = async () => {
    try {
      const { data } = await apiClient.get('/tasks');
      if (data.ok) dispatch(onLoadTask(data.tasks));
    } catch (error) {
      console.log(error);
    }
  }


  return {
    tasks,

    startSavingTask,
    startLoadingTasks,
    startDeletingTask,
  }
}