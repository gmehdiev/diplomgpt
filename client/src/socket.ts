import { io } from 'socket.io-client';
const URL = `${process.env.NEXT_PUBLIC_API_WS_URL}`;

export const socket = io(URL, {
    withCredentials: true
});