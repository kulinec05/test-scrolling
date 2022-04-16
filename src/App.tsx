import { Box, Button, Card, CardContent, Stack, Typography } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import './App.css';
import AuthModal from './AuthModal'
import { useSelector, useDispatch } from 'react-redux';
import { fetchingOn, fetchPosts, addPost } from './reduxToolkit/PostsToolkitSlice';
import { logIn } from './reduxToolkit/logInAction'

const App = () => {
  const state = useSelector((state: any) => state.data)
  const dispatch = useDispatch()


  useEffect(() => {
    if (state.fetching && !state.fetchOver) {
      dispatch(fetchPosts(state.currentPage))
    }
  }, [state.fetching])

  const scrollHandler = (e: any) => {


    if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) <= 100) {
      dispatch(fetchingOn())
    }
  }

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler)
    return function () {
      document.removeEventListener('scroll', scrollHandler)
    }
  }, [])



  const [open, setOpen] = useState(false);


  const { register, handleSubmit } = useForm();
  const onSubmit = (data: any) => {
    dispatch(logIn(data.UserName, data.password))
  }
  const titleRef = useRef<any>()
  const bodyRef = useRef<any>()
  const onPost = () => {
    let post = {
      title: titleRef?.current?.value,
      body: bodyRef?.current?.value,
      id: Date.now(),
      userId: Date.now()
    }
    dispatch(addPost(post))
  }

  return (
    <div>
      <AuthModal open={open} setOpen={setOpen} register={register} handleSubmit={handleSubmit} onSubmit={onSubmit} />

      {state.logged &&
        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1 },
          }}
          noValidate
          autoComplete="off"
        >
          <input ref={titleRef} placeholder="Title" />
          <input ref={bodyRef} placeholder="Description" />
          <Button onClick={onPost} >POST</Button>
        </Box>}
      <Stack spacing={2} m={2}>
        {state.posts.map((post: any) => <Card key={post.id} sx={{ minWidth: 275 }}>
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
