import { ChatTextarea } from "../common/ChatTextarea/ChatTextarea";
import clsx from "clsx";
import cls from "./ChatComponent.module.scss";
import { useEffect, useState } from "react";
import { socket } from "@/socket";
import { updateMessageCache, useGetAllMessageQuery } from "@/lib/api/api";
import { useDispatch } from "react-redux";
import { Messages } from "../Messages/Messages";
import { useSearchParams } from "next/navigation";
import { useGetUserQuery } from "@/lib/api/user";
import { useGetAllChatQuery, useRenameChatMutation } from "@/lib/api/chat";

export const ChatComponent = ({ id }: { id?: string }) => {
  const { data: userData } = useGetUserQuery("");

  const dispatch = useDispatch();
  const [assistant, setAssistant] = useState<string | null>(null);
  let biba: any[] = [];
  const [isConnected, setIsConnected] = useState(false);
  const [transport, setTransport] = useState("N/A");
  const searchParams = useSearchParams();
  console.log(searchParams.getAll("text"));
  const noBalance = () => {
    alert("Денег нет");
  };
  const [balance, setBalance] = useState(0)


  const updateBalance = (value: any) => {
    setBalance(value.balance)
  }
  function onFooEvent(value: any) {
    if (!id) return;

    if ("userMessage" in value) {
      updateMessageCache(dispatch, value.userMessage, id);
    }

    if ("path" in value) {
      biba.push(value.path);
      const a = biba.join("");
      setAssistant(biba.join(""));
    }
    if ("assistantMessage" in value) {
      setAssistant(null);
      biba = [];
      updateMessageCache(dispatch, value.assistantMessage, id);
    }
  }

  const { data, isSuccess } = useGetAllMessageQuery(id ?? "", {
    skip: !id,
  });

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
    socket.on("events", onFooEvent);
    socket.on("nobalance", noBalance);
    socket.on("balance", updateBalance);

    if (searchParams.getAll("text").length && isSuccess && !data?.length) {
      handleClick(searchParams.getAll("text")[0]);
    }
    return () => {
      socket.off("nobalance", noBalance);
      socket.off("events", onFooEvent);
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("balance", updateBalance);

    };
  }, []);



  const handleClick = (value: string) => {
    socket.emit("message", {
      chatUuid: id,
      message: value,
      userUuid: userData?.user.uuid,
    });
  };
  const [renameChat] = useRenameChatMutation()
  const { refetch: refetchChats } = useGetAllChatQuery(userData?.profile.uuid, { skip: !userData?.profile?.uuid })

  useEffect(() => {
    if (searchParams.getAll("text").length && isSuccess && !data?.length) {
      handleClick(searchParams.getAll("text")[0]);
      if (id) {
        renameChat({ uuid: id, name: searchParams.getAll("text")[0].trim() }).then(() => {
          refetchChats()
        })
      }
    }
  }, [data?.length, isSuccess, searchParams])

  return (<div className={clsx(cls.wrapper)}>
    <div className={clsx(cls.subWrapper)}>
      <p>Status: {isConnected ? "connected" : "disconnected"}</p>
      <p>Transport: {transport}</p>
      <p>Balance :{balance || userData?.user.balance}</p>
      <Messages id={id} assistant={assistant} />
      <ChatTextarea handleClick={handleClick} />
    </div>
  </div>

  );
};
