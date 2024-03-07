import { io } from 'socket.io-client';
const URL = 'http://localhost:3001/events';

export const socket = io(URL, {
    withCredentials: true
});