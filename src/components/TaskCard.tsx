import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

interface Props {
  title: string;
  description: string;
}

export const TaskCard = ({ title, description }: Props) => {
  return (
    <div className="bg-slate-900 rounded-lg p-4 flex justify-between">
      <div>
        <h2 className="text-lg font-semibold">{title}</h2>
        <p>{description}</p>
      </div>
      <button>
        <DeleteOutlineIcon />
      </button>
    </div>
  )
}
