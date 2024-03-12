import { configureStore } from '@reduxjs/toolkit'
import { reducer as authSlice } from './slices/auth.slice'
import { messageApi } from '../api/api'
import { setupListeners } from '@reduxjs/toolkit/query'
import { userApi } from '../api/user'
import { chatApi } from '../api/chat'


export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authSlice,
      [messageApi.reducerPath]: messageApi.reducer,
      [userApi.reducerPath]: userApi.reducer,
      [chatApi.reducerPath]: chatApi.reducer

    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(messageApi.middleware, userApi.middleware, chatApi.middleware)

  })

}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']