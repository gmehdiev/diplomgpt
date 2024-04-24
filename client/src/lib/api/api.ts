import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { AppDispatch } from '../redux/store';

enum role {
    "assistant",
    "user",
    "system"
}

export interface MessagesResponse {
    content: string
    createdAt: string
    isSelected:boolean
    messageUuid: string
    role:role
    updatedAt: string
    uuid: string
}

export const messageApi = createApi({
    reducerPath: 'messageApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/message/`, credentials: 'include' }),
    endpoints: (builder) => ({
        getAllMessage: builder.query<MessagesResponse[], string>({
            query: (id) => `${id}`,
        }),
    }),
})


export const { useGetAllMessageQuery } = messageApi


export const updateMessageCache = (dispatch: AppDispatch, newChat: MessagesResponse, id: string) => {
    console.log({newChat})
    dispatch(
        messageApi.util.updateQueryData('getAllMessage', id, (draftChats) => {
            draftChats.push(newChat);
        })
    );
};
