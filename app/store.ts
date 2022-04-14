import { configureStore, ThunkAction } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'
import { Action, AnyAction } from 'redux'
import { ThunkDispatch } from 'redux-thunk'

import profileReducer from '../slices/profile/profileSlice'
import postsReducer from '../slices/posts/postsSlice'
import showingReducer from '../slices/showing/showingSlice'
import searchReducer from '../slices/search/searchSlice'
import chatsReducer from '../slices/chats/chatsSlice'

const makeStore = () =>
  configureStore({
    reducer: {
      profileReducer,
      postsReducer,
      showingReducer,
      searchReducer,
      chatsReducer,
    },
    devTools: true,
  })

export type AppStore = ReturnType<typeof makeStore>
export type AppState = ReturnType<AppStore['getState']>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>

export const wrapper = createWrapper<AppStore>(makeStore)

export type NextThunkDispatch = ThunkDispatch<AppState, void, AnyAction>