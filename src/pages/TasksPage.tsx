import { useState } from 'react';
import { Box, Modal } from '@mui/material';
import { TaskForm } from '../components';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#020617',
  border: '1px solid #4b5563',
  boxShadow: 24,
  p: 4,
  borderRadius: 4
};

export const TasksPage = () => {

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (


    <div className="min-h-screen bg-neutral-900 text-white p-4">
      <h1 className='text-center text-2xl'>Mis Tareas</h1>

      <div className="w-40">
        <button
          onClick={handleOpen}
          className="text-white font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center bg-purple-800 hover:bg-purple-900  transition-all">
          Nueva tarea
        </button>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <TaskForm />
        </Box>
      </Modal>


    </div>
  )
}
