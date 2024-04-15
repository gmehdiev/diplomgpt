import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({ baseUrl: `http://${process.env.NEXT_PUBLIC_API_URL}:3000/user/`, credentials: 'include' }),
    endpoints: (builder) => ({
        getUser: builder.query<any, string>({
            query: () => ``,
        }),
    }),
})


export const { useGetUserQuery } = userApi
