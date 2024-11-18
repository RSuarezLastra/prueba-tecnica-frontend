import { useState } from 'react';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useTaskStore } from '../hooks';
import { Box, Modal } from '@mui/material';
import { TaskEditForm } from './TaskEditForm';

interface Props {
  _id: string;
  title: string;
  description: string;
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: 360, sm: 400 },
  bgcolor: '#020617',
  border: '1px solid #4b5563',
  boxShadow: 24,
  p: 4,
  borderRadius: 4
};

export const TaskCard = ({ _id, title, description }: Props) => {

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { startDeletingTask } = useTaskStore();

  const handleClick = async (id: string) => {
    await startDeletingTask(id);
  }

  return (
    <div className="bg-purple-900 rounded-lg p-4 flex justify-between hover:bg-purple-900/90 hover:cursor-pointer">
      <div onClick={handleOpen}>
        <h2 className="text-lg font-semibold hover:underline">{title}</h2>
        <p className="overflow-hidden text-ellipsis whitespace-nowrap max-w-[280px]">{description}</p>
      </div>
      <button onClick={() => handleClick(_id)}>
        <DeleteOutlineIcon className='hover:text-red-500' />
      </button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <TaskEditForm handleClose={handleClose} _id={_id} title={title} description={description} />
        </Box>
      </Modal>
    </div>
  )
}
