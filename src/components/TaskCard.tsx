import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useTaskStore } from '../hooks';

interface Props {
  id: string;
  title: string;
  description: string;
}

export const TaskCard = ({ id, title, description }: Props) => {

  const { startDeletingTask } = useTaskStore();

  const handleClick = async (id: string) => {
    await startDeletingTask(id);
  }

  return (
    <div className="bg-slate-900 rounded-lg p-4 flex justify-between">
      <div>
        <h2 className="text-lg font-semibold">{title}</h2>
        <p>{description}</p>
      </div>
      <button onClick={() => handleClick(id)}>
        <DeleteOutlineIcon />
      </button>
    </div>
  )
}
