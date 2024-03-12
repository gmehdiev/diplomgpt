import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const chatApi = createApi({
    reducerPath: 'chatApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/chat/', credentials: 'include' }),
    tagTypes: ['Post'],
    endpoints: (builder) => ({
        createChat: builder.query<any, any>({
            query: (body) => ({
                url: '',
                method: 'POST',
                body,
            }),
        }),
        getAllChat: builder.query<any, any>({
            query: (uuid) => `${uuid}`,
        }),
        deleteChat: builder.query<any, any>({
            query: (uuid) => ({
                url: `${uuid}`,
                method: 'Delete',
            }),
        }),
    }),
})


export const { useLazyCreateChatQuery, useGetAllChatQuery, useLazyDeleteChatQuery } = chatApi
