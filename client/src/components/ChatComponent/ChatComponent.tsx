import { ChatTextarea } from "../common/ChatTextarea/ChatTextarea"
import clsx from "clsx"
import cls from "./ChatComponent.module.scss"
import { useEffect, useState } from "react"
import { socket } from "@/socket";
import { updateMessageCache } from "@/lib/api/api"
import { useDispatch } from "react-redux"
import { Messages } from "../Messages/Messages"
import { useSearchParams } from "next/navigation"

export const ChatComponent = ({ id }: { id?: string }) => {

    const dispatch = useDispatch();
    const [assistant, setAssistant] = useState<string | null>(null);
    let biba: any[] = []
    const [isConnected, setIsConnected] = useState(false);
    const [transport, setTransport] = useState("N/A");
    const searchParams = useSearchParams()
    console.log(searchParams.getAll('text'))



    function onFooEvent(value: any) {
        if (!id) return

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
        if (socket.connected) {
            onConnect();
        }
        function onConnect() {
            setIsConnected(true);
            setTransport(socket.io.engine.transport.name);

            socket.io.engine.on("upgrade", (transport) => {
                setTransport(transport.name);
            });
        }

        function onDisconnect() {
            setIsConnected(false);
            setTransport("N/A");
        }
        socket.on("connect", onConnect);
        socket.on("disconnect", onDisconnect);
        socket.on('events', onFooEvent);

        if (searchParams.getAll('text').length) {
            handleClick(searchParams.getAll('text')[0])
        }
        return () => {
            socket.off('events', onFooEvent);
            socket.off("connect", onConnect);
            socket.off("disconnect", onDisconnect);
        };
    }, []);

    const handleClick = (value: string) => {
        socket.emit("message", {
            chatUuid: id,
            message: value
        })
    }
    return <div className={clsx(cls.Wrapper)}>
        <p>Status: {isConnected ? "connected" : "disconnected"}</p>
        <p>Transport: {transport}</p>
        <Messages id={id} assistant={assistant} />
        <ChatTextarea handleClick={handleClick} />
    </div>
}
