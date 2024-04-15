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
    baseQuery: fetchBaseQuery({ baseUrl: `http://${process.env.NEXT_PUBLIC_API_URL}:3000/message/`, credentials: 'include' }),
    endpoints: (builder) => ({
        getAllMessage: builder.query<Messages[], string>({
            query: (id) => `${id}`,
        }),
    }),
})


export const { useGetAllMessageQuery } = messageApi


export const updateMessageCache = (dispatch: AppDispatch, newChat, id: string) => {
    dispatch(
        messageApi.util.updateQueryData('getAllMessage', id, (draftChats) => {
            draftChats.push(newChat);
        })
    );
};
