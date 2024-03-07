'use client'
import clsx from "clsx";
import cls from "./Chat.module.scss";
import { socket } from "@/socket";
import { useEffect, useState } from "react";
import { ConnectionManager } from "@/components/Sockets/ConnectionManages";
import { ConnectionState } from "@/components/Sockets/ConnectionState";
import { Events } from "@/components/Sockets/Events";

export default function Chat() {
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [fooEvents, setFooEvents] = useState<string>('');
    const biba: any[] = []
    useEffect(() => {
        function onConnect() {
          setIsConnected(true);
        }
    
        function onDisconnect() {
          setIsConnected(false);
        }
    
        function onFooEvent(value: any) {
            
            biba.push(value.path)
            const a = biba.join('')
            console.log(a)
            setFooEvents(biba.join(''))
        }
    
        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);
        socket.on('events', onFooEvent);
        return () => {
          socket.off('connect', onConnect);
          socket.off('disconnect', onDisconnect);
          socket.off('events', onFooEvent);
        };
      }, []);

const [value, setValue ] = useState('')
    return (
        <main>
            {/* <div className={clsx(cls.test)}>asdasd</div> */}
            <ConnectionState isConnected={ isConnected } />
      <ConnectionManager />
      <div className={clsx(cls.biba)}>
        <div>  {value}</div>
        <br />
        <div>   {fooEvents}</div>
        <br />
       
      
         <input type="text" value={value} onChange={(e)=> setValue(e.target.value)} />
         <button onClick={()=> socket.emit("message", {
    chatUuid:"4493d807-99b6-4c1f-97f7-3bc058e9390b",
    message: value
})}>asdasd</button>
      </div>
     
        </main>
    );
}
