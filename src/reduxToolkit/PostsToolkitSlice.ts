import { createSlice } from "@reduxjs/toolkit";
import './posts.json'


const PostsToolkitSlice = createSlice({
    name: 'data',
    initialState: {
        posts: [],
        currentPage: 1,
        fetching: true,
        logged: false,
        userName: '',
        fetchOver: false
    },
    reducers: {
        addPost(state: any, action) {
            state.posts = [action.payload].concat(state.posts)
        },
        fetchingOff(state: any) {
            state.fetching = false
        },
        fetchingOn(state: any) {
            state.fetching = true
        },
        logInUser(state, action) {
            state.logged = true
            state.userName = action.payload
        },
        logOut(state) {
            state.logged = false
        },
        fetchingPosts(state: any, action) {
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
    fetch(`https://jsonplaceholder.typicode.com/posts?_page=${currentPage}&_limit=10`)
        .then((res) => res.json())
        .then((res) => {
            dispatch(fetchingPosts(res))
        })
}





export default PostsToolkitSlice.reducer
export const { fetchingOff, fetchingOn, fetchingPosts, logInUser, addPost, logOut } = PostsToolkitSlice.actions