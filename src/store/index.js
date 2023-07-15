import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import {noteSlice} from './api/NoteSlice'
import {authSlice} from './api/AuthSlice'
import {userSlice} from './api/UserSlice'

export const store = configureStore({
  reducer: {
    [noteSlice.reducerPath]: noteSlice.reducer,
    [authSlice.reducerPath]: authSlice.reducer,
    [userSlice.reducerPath]: userSlice.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
    .concat(noteSlice.middleware)
    .concat(authSlice.middleware)
    .concat(userSlice.middleware),
})

setupListeners(store.dispatch)