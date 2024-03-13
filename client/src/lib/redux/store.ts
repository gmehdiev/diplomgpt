import { configureStore } from '@reduxjs/toolkit'
import { reducer as authSlice } from './slices/auth.slice'
import { messageApi } from '../api/api'
import { userApi } from '../api/user'
import { chatApi } from '../api/chat'
import { proxyApi } from '../api/proxy'


export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authSlice,
      [messageApi.reducerPath]: messageApi.reducer,
      [userApi.reducerPath]: userApi.reducer,
      [chatApi.reducerPath]: chatApi.reducer,
      [proxyApi.reducerPath]: proxyApi.reducer

    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(messageApi.middleware, userApi.middleware, chatApi.middleware, proxyApi.middleware)

  })

}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']