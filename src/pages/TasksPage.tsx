import { useState } from 'react';
import { Box, Modal } from '@mui/material';
import { TaskForm, TasksGrid } from '../components';
import { Add, Logout } from '@mui/icons-material';
import { useAuthStore } from '../hooks';

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

export const TasksPage = () => {

  const { startLogout } = useAuthStore();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (


    <div className="min-h-screen bg-neutral-900 text-gray-200 p-4 relative">
      <h1 className='text-center text-2xl my-4'>Mis Tareas</h1>

      <div className='w-44 h-full flex flex-col items-center'>
        <div className="w-40">
          <button
            onClick={handleOpen}
            className="text-white font-medium rounded-md text-sm w-full px-5 py-2.5 text-center bg-purple-800 hover:bg-purple-900  transition-all">
            <Add sx={{ mr: 2 }} />
            Nueva tarea
          </button>
        </div>

        <div className="w-44 absolute bottom-3 left-0">
          <button
            onClick={startLogout}
            className="text-white font-medium rounded-md text-sm w-full px-5 py-2.5 text-center ">
            <Logout sx={{ mr: 2 }} />
            Cerrar sesión
          </button>
        </div>
      </div>


      <TasksGrid />


      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <TaskForm handleClose={handleClose} />
        </Box>
      </Modal>



    </div>
  )
}
