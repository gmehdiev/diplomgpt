import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { AppDispatch } from '../redux/store';

export const messageApi = createApi({
    reducerPath: 'messageApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/message/', credentials: 'include' }),
    endpoints: (builder) => ({
        getAllMessage: builder.query<any, string>({
            query: (id) => `${id}`,
        }),
    }),
})


export const { useGetAllMessageQuery } = messageApi


export const updateMessageCache = (dispatch: AppDispatch, newChat, id: string) => {
    console.log(newChat)
    dispatch(
        messageApi.util.updateQueryData('getAllMessage', id, (draftChats) => {
            console.log(draftChats)
            draftChats.push(newChat);
        })
    );
};
