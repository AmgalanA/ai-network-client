import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
import { IGroup } from '../../types/groups/IGroup'

interface IState {
  groups: IGroup[]
}

const initialState: IState = {
  groups: [],
}

export const groupsSlice = createSlice({
  name: 'groups',
  initialState,
  reducers: {
    setGroups: (store, action: PayloadAction<IGroup[]>) => {
      store.groups = action.payload
    },
    addGroup: (store, action: PayloadAction<IGroup>) => {
      store.groups = [...store.groups, action.payload]
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      state.groups = action.payload.groupsReducer.groups
    },
  },
})

export default groupsSlice.reducer

export const { setGroups, addGroup } = groupsSlice.actions
