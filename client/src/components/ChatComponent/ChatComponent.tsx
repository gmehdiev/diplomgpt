import { ChatTextarea } from "../common/ChatTextarea/ChatTextarea"
import clsx from "clsx"
import cls from "./ChatComponent.module.scss"
import { useEffect, useState } from "react"
import { Message } from "../common/Message/Message"
import { socket } from "@/socket";
import { updateMessageCache, useGetAllMessageQuery } from "@/lib/api/api"
import { useDispatch } from "react-redux"

export const ChatComponent = ({ id }: { id: string }) => {
    const { data, error, isLoading, isSuccess } = useGetAllMessageQuery(id)
    const dispatch = useDispatch();
    console.log(id)
    const [assistant, setAssistant] = useState<string | null>(null);
    let biba: any[] = []
    function onFooEvent(value: any) {
        if ('userMessage' in value) {
            updateMessageCache(dispatch, value.userMessage, id)
        }
        if ('path' in value) {
            biba.push(value.path)
            const a = biba.join('')
            setAssistant(biba.join(''))

        }
        if ('assistantMessage' in value) {
            setAssistant(null)
            biba = []
            updateMessageCache(dispatch, value.assistantMessage, id)

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
            chatUuid: id,
            message: value
        })
    }
    return <div className={clsx(cls.Wrapper)}>
        <div className={clsx(cls.Messages)}>
            {isSuccess && data.map((item: any) => <Message key={item.uuid} content={item.content} role={item.role} />)}

            {assistant && <Message content={assistant} role={'assistant'} />}
        </div>

        <ChatTextarea handleClick={handleClick} />
    </div>
}