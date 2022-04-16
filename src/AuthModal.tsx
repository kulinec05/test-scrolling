import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Input, TextField } from '@mui/material';

const style = {
  display:'flex',
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function AuthModal({ open, setOpen, register, handleSubmit, onSubmit }: any) {

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>Log In</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}
        component='form'
        autoComplete="off" >
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              required
              id="outlined-required"
              label="UserName"
              placeholder='UserName'
              {...register("UserName")} />
            <TextField
            required
              id="outlined-password-input"
              label="Password"
              type="password"
              autoComplete="current-password" placeholder='Password'
              {...register("password")} />
            <Input type="submit" />
          </form>
        </Box>
      </Modal>
    </div>
  );
}