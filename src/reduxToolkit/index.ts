import { configureStore,combineReducers } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import PostsToolkitSlice from './PostsToolkitSlice'


const rootReducer = combineReducers({
    data: PostsToolkitSlice
}) 

export const store = configureStore({
    reducer: rootReducer
  })

export type RootState = ReturnType<typeof rootReducer>
