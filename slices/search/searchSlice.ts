import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  searchQuery: '',
}

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload
    },
  },
})

export default searchSlice.reducer

export const { setSearchQuery } = searchSlice.actions
