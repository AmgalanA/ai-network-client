import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
import { AppState } from '../../app/store'
import { IPost } from '../../types/post/IPost'

interface State {
  posts: IPost[]
}

const initialState: State = {
  posts: [],
}

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts(state, action: PayloadAction<IPost[]>) {
      state.posts = action.payload
    },
    addPost(state, action: PayloadAction<IPost>) {
      state.posts = [...state.posts, action.payload]
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      state.posts = action.payload.postsReducer.posts.posts
    },
  },
})

export const { setPosts, addPost } = postsSlice.actions

export default postsSlice.reducer

export const selectPosts = () => (state: AppState) => state.postsReducer
