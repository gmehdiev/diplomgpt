import { io } from 'socket.io-client';
const URL = `ws://${process.env.NEXT_PUBLIC_API_URL}:3001/events`;

export const socket = io(URL, {
    withCredentials: true
});