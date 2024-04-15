export interface ProxyInterface {
    apiKey: string
    proxyAddress: string
    proxyPort: string
    proxyUsername: string
    proxyPassword: string
}

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
export interface rename {
    uuid: string,
    name: string
}
export const proxyApi = createApi({
    reducerPath: 'proxyApi',
    baseQuery: fetchBaseQuery({ baseUrl: `http://${process.env.NEXT_PUBLIC_API_URL}:3000/proxy/`, credentials: 'include' }),
    tagTypes: ['Post'],
    endpoints: (builder) => ({
        sendProxy: builder.mutation<any, any>({
            query: (body) => ({
                url: '',
                method: 'POST',
                body,
            }),
        }),

    }),
})


export const { useSendProxyMutation } = proxyApi
