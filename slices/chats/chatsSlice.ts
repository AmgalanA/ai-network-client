import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
import { IChat } from '../../types/chat/IChat'

interface IState {
  chats: IChat[]
}

const initialState: IState = {
  chats: [],
}

const chatsSlice = createSlice({
  name: 'chats',
  initialState,
  reducers: {
    setChats: (state, action: PayloadAction<IChat[]>) => {
      state.chats = action.payload
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      state.chats = action.payload.chatsReducer.chats
    },
  },
})

export default chatsSlice.reducer

export const { setChats } = chatsSlice.actions
