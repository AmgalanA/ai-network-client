import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
import { IAlbum } from '../../types/album/IAlbum'

interface IState {
  albums: IAlbum[]
}

const initialState: IState = {
  albums: [],
}

export const albumsSlice = createSlice({
  name: 'albums',
  initialState,
  reducers: {
    setAlbums: (store, action: PayloadAction<IAlbum[]>) => {
      store.albums = action.payload
    },
    addAlbum: (store, action: PayloadAction<IAlbum>) => {
      store.albums = [...store.albums, action.payload]
    },
  },
  extraReducers: {
    [HYDRATE]: (store, action) => {
      store.albums = action.payload.albumsReducer.albums
    },
  },
})

export default albumsSlice.reducer

export const { setAlbums, addAlbum } = albumsSlice.actions
