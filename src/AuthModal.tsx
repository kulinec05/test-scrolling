import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from './reduxToolkit/PostsToolkitSlice'

const style = {
  display: 'flex',
  flexDirection: 'column',
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



  const handleLogOut = () => dispatch(logOut())
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const state = useSelector((state: any) => state.data)
  const dispatch = useDispatch()

  return (
    <div>
      {!state.logged ? <Button onClick={handleOpen} >LOG IN</Button> :
        <Button onClick={handleLogOut} >LOG OUT</Button>}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}
        >
          <form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={() => {

            handleClose()

            handleSubmit(onSubmit)()
          }}>
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
            <Button type="submit" >LOG IN</Button>

          </form>
        </Box>
      </Modal>
    </div>
  );
}