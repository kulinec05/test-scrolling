import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";








const PostsToolkitSlice = createSlice({
    name: 'data',
    initialState: {
        posts: [],
        currentPage: 1,
        fetching: true,
        fetchOver: false
    },
    reducers: {
        fetchingOff(state: any) {
            state.fetching = false
        },
        fetchingOn(state: any) {
            state.fetching = true
        },
        fetchingPosts(state: any, action) {
            console.log(state)

            state.posts = [...state.posts, ...action.payload]
            state.currentPage += 1
            state.fetching = false
            if (!action.payload.length) {
                state.fetchOver = true
            }
        }

    }

})
export const fetchPosts = (currentPage: any) => (dispatch: any) => {
     axios.get(`https://jsonplaceholder.typicode.com/posts?_page=${currentPage}&_limit=10`)
        .then((res) => dispatch(fetchingPosts(res.data)))
}




export default PostsToolkitSlice.reducer
export const { fetchingOff, fetchingOn, fetchingPosts } = PostsToolkitSlice.actions