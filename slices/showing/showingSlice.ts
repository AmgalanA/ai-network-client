import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  isShowingCreatePostModal: false,
}

export const showingSlice = createSlice({
  name: 'showing',
  initialState,
  reducers: {
    setIsShowingCreatePostModal: (state, action: PayloadAction<boolean>) => {
      state.isShowingCreatePostModal = action.payload
    },
  },
})

export default showingSlice.reducer

export const { setIsShowingCreatePostModal } = showingSlice.actions
