'use client'
import clsx from "clsx";
import cls from "./ChatSidebar.module.scss";
import { FC, useState } from "react";
import { Button, ButtonTheme } from "../common/Button/Button";
import { useCreateChatMutation, useGetAllChatQuery } from "@/lib/api/chat";
import { useGetUserQuery } from "@/lib/api/user";
import Link from "next/link";
import { ChatLink } from "../common/ChatLink/ChatLink";

interface ChatSidebarInterface {
}

export const ChatSidebar: FC<ChatSidebarInterface> = ({ }) => {

    const [sidebarOpen, setSidebarOpen] = useState(false)
    const { data: userData } = useGetUserQuery('')
    const { data: allChats, isSuccess, refetch: refetchChats } = useGetAllChatQuery(userData?.profile.uuid, { skip: !userData?.profile?.uuid })
    const [createChat] = useCreateChatMutation()

    const handleClick = async () => {
        if (!userData?.profile.uuid) return
        await createChat({ profileUuid: userData?.profile.uuid })
        await refetchChats()
    }

    return (
        <>
            <nav className={clsx(cls.nav, {}, [])}>

                <div className={clsx(cls.wrapper, { [cls.open]: sidebarOpen, [cls.close]: !sidebarOpen, }, [])}><button className={clsx(cls.Burger)}
                    onClick={() => setSidebarOpen(prev => !prev)}>{sidebarOpen ? '<' : '>'}</button>
                    <Button theme={ButtonTheme.DEFAULT}>sad</Button>
                    <div className={clsx(cls.test)}>
                        {isSuccess && allChats.map(chat =>
                            <ChatLink key={chat.uuid} chat={chat} refetch={refetchChats} />
                        )}
                    </div>
                    <button onClick={async () => await handleClick()}>
                        create
                    </button>
                </div>

            </nav>
        </>
    );
};
