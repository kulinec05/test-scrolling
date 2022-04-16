import { Button, Card, CardContent, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import './App.css';
import AuthModal from './AuthModal'

const App = () => {
  const [posts, setPosts] = useState([])


  const [open, setOpen] = useState(false);


  //useFrom
  const { register, handleSubmit } = useForm();
  const onSubmit = (data:any) => console.log(data);

  useEffect(()=>{
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then(res=>res.json())
    .then(res=>setPosts(res))
  },[])


  return (
    <div>
      <AuthModal  open={open} setOpen={setOpen} register={register} handleSubmit={handleSubmit} onSubmit={onSubmit}/>
      <Stack spacing={2} m={2}>
        {posts.map((post:any)=><Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography variant="h5">
            {post.title}
          </Typography>
          <Typography>
          {post.body}
          </Typography>
        </CardContent>
      </Card>)}
      </Stack>
      
    </div>
  );
}

export default App;
