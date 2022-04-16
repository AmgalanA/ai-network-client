import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
import { ISong } from '../../types/music/ISong'

interface IState {
  songs: ISong[]
}

const initialState: IState = {
  songs: [],
}

export const musicSlice = createSlice({
  name: 'music',
  initialState,
  reducers: {
    setSongs: (store, action: PayloadAction<ISong[]>) => {
      store.songs = action.payload
    },
    addSong: (store, action: PayloadAction<ISong>) => {
      store.songs = [...store.songs, action.payload]
    },
  },
  extraReducers: {
    [HYDRATE]: (store, action) => {
      store.songs = action.payload.musicReducer.songs
    },
  },
})

export default musicSlice.reducer

export const { setSongs, addSong } = musicSlice.actions
