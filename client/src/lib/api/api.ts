import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const chatApi = createApi({
    reducerPath: 'chatApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/message/', credentials: 'include' }),
    endpoints: (builder) => ({
        getAllChats: builder.query<any, string>({
            query: (id) => `${id}`,
        }),
    }),
})

export const { useGetAllChatsQuery } = chatApi


export const updateChatsCache = (dispatch, newChat, id) => {
    console.log(newChat)
    dispatch(
        chatApi.util.updateQueryData('getAllChats', id, (draftChats) => {
            console.log(draftChats)
            draftChats.push(newChat);
        })
    );
};
