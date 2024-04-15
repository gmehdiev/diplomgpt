import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ChatInterface } from '../types/ChatInterface'
export interface rename {
    uuid: string,
    name: string
}
export const chatApi = createApi({
    reducerPath: 'chatApi',
    baseQuery: fetchBaseQuery({ baseUrl: `http://${process.env.NEXT_PUBLIC_API_URL}:3000/chat/`, credentials: 'include' }),
    tagTypes: ['Post'],
    endpoints: (builder) => ({
        createChat: builder.mutation<ChatInterface, any>({
            query: (body) => ({
                url: '',
                method: 'POST',
                body,
            }),
        }),
        getAllChat: builder.query<ChatInterface[], any>({
            query: (uuid) => `${uuid}`,
        }),
        deleteChat: builder.mutation<ChatInterface, any>({
            query: (uuid) => ({
                url: `${uuid}`,
                method: 'Delete',
            }),
        }),
        renameChat: builder.mutation<ChatInterface, rename>({
            query: (body) => ({
                url: `${body.uuid}`,
                method: 'PATCH',
                body: { name: body.name }
            }),
        }),
    }),
})


export const { useCreateChatMutation, useGetAllChatQuery, useDeleteChatMutation, useRenameChatMutation } = chatApi
