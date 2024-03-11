import { ChatTextarea } from "../common/ChatTextarea/ChatTextarea"
import clsx from "clsx"
import cls from "./ChatComponent.module.scss"
import { useEffect, useState } from "react"
import { Message } from "../common/Message/Message"
import { socket } from "@/socket";
import { updateChatsCache, useGetAllChatsQuery } from "@/lib/api/api"
import { useDispatch } from "react-redux"

export const ChatComponent = () => {
    const { data, error, isLoading, isSuccess } = useGetAllChatsQuery('6e2d2879-d66a-4e3c-add3-276be4498fd4')

    const dispatch = useDispatch();

    const [assistant, setAssistant] = useState<string| null>(null);
    // console.log(assistant)
    let biba: any[] = [] 
        function onFooEvent(value: any) {
            if ('userMessage' in value) {
                updateChatsCache(dispatch, value.userMessage,'6e2d2879-d66a-4e3c-add3-276be4498fd4')
            }
            if ('path' in value) {
                biba.push(value.path) 
                const a = biba.join('')
                setAssistant(biba.join(''))
               
            }
             if ('assistantMessage' in value) {
                setAssistant(null)
                biba = []
                updateChatsCache(dispatch, value.assistantMessage,'6e2d2879-d66a-4e3c-add3-276be4498fd4')

                }
         
        }
    useEffect(() => {
        socket.on('events', onFooEvent);
        return () => {
          socket.off('events', onFooEvent);
        };
      }, []);

      const handleClick = (value: string) => {
        socket.emit("message", {
            chatUuid:"6e2d2879-d66a-4e3c-add3-276be4498fd4",
            message: value})
      }
    return   <div className={clsx(cls.Wrapper)}>
        <div className={clsx(cls.Messages)}>
            {isSuccess && data.map((item: any)=> <Message key={item.uuid} content={item.content} role={item.role}/>)}
            
            {assistant  && <Message content={assistant} role={'assistant'}/>}
            </div>
            
            <ChatTextarea handleClick={handleClick}/>
        </div>
}