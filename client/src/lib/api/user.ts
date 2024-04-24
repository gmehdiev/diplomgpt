import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/user/`, credentials: 'include' }),
    endpoints: (builder) => ({
        getUser: builder.query<any, string>({
            query: () => ``,
        }),
    }),
})


export const { useGetUserQuery } = userApi
