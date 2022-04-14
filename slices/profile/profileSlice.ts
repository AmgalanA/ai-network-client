import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IProfile } from '../../types/profile/IProfile'

interface State {
  profile: IProfile
}

const initialState: State = {} as State

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfile(state, action: PayloadAction<IProfile>) {
      state.profile = action.payload
    },
  },
})

export default profileSlice.reducer

export const { setProfile } = profileSlice.actions
