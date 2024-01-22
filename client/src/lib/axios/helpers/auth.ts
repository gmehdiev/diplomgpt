import { AxiosResponse } from "axios"
import api from ".."


export const login = async (email: string, password: string, rememberMe: boolean): Promise<AxiosResponse<{accessToken: string}>> =>{
    return api.post<{accessToken: string}>('/auth/login', {email, password,rememberMe})
}

export const registration = async (email: string, password: string, passwordRepeat: string): Promise<AxiosResponse<{accessToken: string}>> =>{
    return api.post<{accessToken: string}>('/auth/register', {email, password, passwordRepeat})
}

export const logout = async (): Promise<void> =>{
    return api.post('/logout')
}