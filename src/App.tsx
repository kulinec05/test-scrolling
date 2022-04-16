import { Button, Card, CardContent, Stack, Typography } from '@mui/material';
import axios from 'axios';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import './App.css';
import AuthModal from './AuthModal'
import { useSelector, useDispatch } from 'react-redux';
import { fetchingOff,fetchingOn, fetchingPosts ,fetchPosts } from './reduxToolkit/PostsToolkitSlice';

const App = () => {
  const state = useSelector((state:any)=>state.data)
  const dispatch = useDispatch()
  const [currentPage, setCurrentPage] = useState(0);
  const [fetching, setFetching] = useState(true);
  const [fetchOver,setFetchOver] = useState(false)

  useEffect(() => {
    console.log(state)
    if(state.fetching && !state.fetchOver){
            dispatch(fetchPosts(state.currentPage))
    }

  }, [state.fetching])

  const scrollHandler = (e: any) => {


    if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) <= 100 ) {
      dispatch(fetchingOn())
      console.log(e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight))
    }
  }

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler)
    return function () {
      document.removeEventListener('scroll', scrollHandler)
    }
  }, [])



  const [open, setOpen] = useState(false);


  //useFrom
  const { register, handleSubmit } = useForm();
  const onSubmit = (data: any) => console.log(data);

  return (
    <div>
      <Button onClick={()=>{
        console.log(state)
      }}>qwertyu</Button>
      <AuthModal open={open} setOpen={setOpen} register={register} handleSubmit={handleSubmit} onSubmit={onSubmit} />
      <Stack spacing={2} m={2}>
        {state.posts.map((post: any) => <Card sx={{ minWidth: 275 }}>
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
