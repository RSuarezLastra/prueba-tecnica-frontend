import { useState } from 'react';
import { Box, Button, Menu, MenuItem, Modal } from '@mui/material';
import { TaskForm, TasksGrid } from '../components';
import { Add, Logout, AccountCircle } from '@mui/icons-material';
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

  const { startLogout, user } = useAuthStore();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (


    <div className="min-h-screen bg-neutral-900 text-gray-200 p-5 relative">

      <div className='w-full flex items-center justify-between'>
        <div>
          <button
            onClick={handleOpen}
            className="text-white font-medium rounded-xl sm:rounded-lg text-sm w-full p-2 sm:px-5 py-2 text-center bg-violet-800 hover:bg-violet-900  transition-all">
            <Add sx={{ mr: { xs: 0, sm: 2 } }} />
            <span className='hidden sm:inline'>Nueva tarea</span>
          </button>
        </div>

        <div>
          <Button
            color='secondary'
            className='text-white mr-4'
            onClick={handleClick}
          >
            <AccountCircle className='text-white mr-2' />
            <span className='text-white text-xs sm:text-sm'>{user.name}</span>
          </Button>

          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={openMenu}
            onClose={handleCloseMenu}
            sx={{
              '& .MuiPaper-root': {
                backgroundColor: '#4e4646',
              },
            }}

          >
            <MenuItem onClick={startLogout} >
              <Logout sx={{ mr: 1, fontSize: 18, color: 'white' }} />
              <span className='text-white'>cerrar sesion</span>
            </MenuItem>
          </Menu>
        </div>
      </div>

      <h1 className='text-center text-2xl my-4'>Mis Tareas</h1>

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
