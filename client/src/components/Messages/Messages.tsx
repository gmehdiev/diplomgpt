import clsx from "clsx"
import { Message } from "../common/Message/Message"
import { useGetAllMessageQuery } from "../../lib/api/api"
import cls from "./Messages.module.scss"
import { useEffect, useRef } from "react"

interface MessagesProps {
    id?: string
    assistant: string | null;
}
export const Messages = (props: MessagesProps) => {
    const messagesRef = useRef<HTMLDivElement>(null);

    const { assistant, id } = props

    const { data, isSuccess } = useGetAllMessageQuery(id ?? '', {
        skip: !id
    })
    const scrollToBottom = () => {
        if (messagesRef.current) {
            messagesRef.current.scrollIntoView({ behavior: "smooth" });
            console.log(messagesRef.current.style.overflowY)
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [data]);
    return <div className={clsx(cls.Messages)} >
        {isSuccess && data.map((item: any) => <Message key={item.uuid} content={item.content} role={item.role} />)}
        {assistant && <Message content={assistant} role={'assistant'} />}
        <div ref={messagesRef} />
    </div>
}
