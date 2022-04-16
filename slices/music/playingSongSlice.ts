import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ISong } from '../../types/music/ISong'

interface IState {
  song: ISong
  currentTime: number
  duration: number
  volume: number
  pause: boolean
}

const initialState: IState = {
  song: {} as ISong,
  currentTime: 0,
  duration: 0,
  volume: 50,
  pause: true,
}

export const playingSongSlice = createSlice({
  name: 'playingSong',
  initialState,
  reducers: {
    setPlayingSong: (store, action: PayloadAction<ISong>) => {
      store.song = action.payload
    },
    setCurrentTime: (store, action: PayloadAction<number>) => {
      store.currentTime = action.payload
    },
    setDuration: (store, action: PayloadAction<number>) => {
      store.duration = action.payload
    },
    setVolume: (store, action: PayloadAction<number>) => {
      store.volume = action.payload
    },
    setPause: (store, action: PayloadAction<boolean>) => {
      store.pause = action.payload
    },
  },
})

export default playingSongSlice.reducer

export const {
  setPlayingSong,
  setCurrentTime,
  setDuration,
  setVolume,
  setPause,
} = playingSongSlice.actions
