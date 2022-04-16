import { Card, CardContent, Stack, Typography } from '@mui/material';
import axios from 'axios';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import './App.css';
import AuthModal from './AuthModal'

const App = () => {
  const [posts, setPosts] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [fetching, setFetching] = useState(true);
  const [fetchOver,setFetchOver] = useState(false)

  useEffect(() => {
    if (fetching && !fetchOver) {
      axios.get(`https://jsonplaceholder.typicode.com/posts?_page=${currentPage}&_limit=10`)
        .then((res: any) => {
          setPosts([...posts, ...res.data])
          setCurrentPage(currentPage + 1)
          console.log(res.data)
          if(!res.data.length){
            setFetchOver(true)
          }
        })
        .finally(()=>setFetching(false))
    }
  }, [fetching])

  const scrollHandler = (e: any) => {


    if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) <= 100 ) {
      setFetching(true)
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
      <AuthModal open={open} setOpen={setOpen} register={register} handleSubmit={handleSubmit} onSubmit={onSubmit} />
      <Stack spacing={2} m={2}>
        {posts.map((post: any) => <Card sx={{ minWidth: 275 }}>
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
