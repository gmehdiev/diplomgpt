'use client'
import clsx from "clsx";
import cls from "./ChatLinks.module.scss";
import { useCreateChatMutation, useGetAllChatQuery } from "@/lib/api/chat";
import { useGetUserQuery } from "@/lib/api/user";
import { Button, ButtonTheme } from "@/components/common/Button/Button";
import { ChatLink } from "@/components/common/ChatLink/ChatLink";


export const ChatSidebar = ({ }) => {

    const { data: userData } = useGetUserQuery('')
    const { data: allChats, isSuccess, refetch: refetchChats } = useGetAllChatQuery(userData?.profile.uuid, { skip: !userData?.profile?.uuid })
    const [createChat] = useCreateChatMutation()

    const handleClick = async () => {
        if (!userData?.profile.uuid) return
        await createChat({ profileUuid: userData?.profile.uuid })
        await refetchChats()
    }

    return (
        <div className={clsx(cls.wrapper)}>
            <div className={clsx(cls.chatLinks)}>
                {isSuccess && allChats.map(chat =>
                    <ChatLink key={chat.uuid} chat={chat} refetch={refetchChats} />
                )}
            </div>
            <button className={clsx(cls.createButton)} onClick={async () => await handleClick()}>
                Create chat
            </button>
        </div>
    );
};
