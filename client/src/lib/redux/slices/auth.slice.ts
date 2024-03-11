import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";
import { StatusOfRequestEnum } from "../types/StatusOfRequestEnum";
import { login, registration } from "@/lib/axios/helpers/auth";



interface initialState {
  isAuth: boolean | null,
  status: StatusOfRequestEnum,
  error: {} | null
}



const initialState: initialState = {
  isAuth: null,
  status: StatusOfRequestEnum.IDLE,
  error: null
}

export interface handleRegisterInterface {
  email: string, password: string, passwordRepeat: string
}

export const handleRegister = createAsyncThunk(
  'auth/handleRegister',
  async function ({ email, password, passwordRepeat }: handleRegisterInterface, { rejectWithValue }) {
    try {
      const response = await registration(email, password, passwordRepeat)
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
)


export const handleLogin = createAsyncThunk(
  'auth/handleLogin',
  async function ({ email, password, rememberMe }: { email: string, password: string, rememberMe: boolean }, { rejectWithValue }) {
    try {
      const response = await login(email, password, rememberMe)
    } catch (error: any) {
      console.log(error)
      return rejectWithValue(error.message)
    }
  }
)

export const checkAuth = createAsyncThunk(
  'auth/checkAuth',
  async function (_, { rejectWithValue }) {
    try {
      const response = await axios.get<{ accessToken: string }>(`http://localhost:3000/auth/refresh`, { withCredentials: true })
      localStorage.setItem('token', response.data.accessToken)
      console.log(response.data.accessToken)
    } catch (error: any) {
      return rejectWithValue(error?.message)
    }

  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(handleRegister.pending, handleActionPending)
      .addCase(handleRegister.fulfilled, handleActionFulfilled)
      .addCase(handleRegister.rejected, handleActionRejected)
      .addCase(handleLogin.pending, handleActionPending)
      .addCase(handleLogin.fulfilled, handleActionFulfilled)
      .addCase(handleLogin.rejected, handleActionRejected)
      .addCase(checkAuth.pending, handleActionPending)
      .addCase(checkAuth.fulfilled, handleActionFulfilled)
      .addCase(checkAuth.rejected, handleActionRejected)
  }
})

const handleActionPending = (state: initialState) => {
  state.status = StatusOfRequestEnum.LOADING;
  state.error = null;
}

const handleActionFulfilled = (state: initialState) => {
  state.status = StatusOfRequestEnum.SUCCESS;
  state.error = null;
  state.isAuth = true
}

const handleActionRejected = (state: initialState, action: PayloadAction<any>) => {
  state.status = StatusOfRequestEnum.ERROR;
  state.error = action.payload;
  state.isAuth = false
}



export const { actions, reducer } = authSlice;