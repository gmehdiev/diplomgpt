'use client'
import clsx from "clsx";
import cls from "./ChatSidebar.module.scss";
import { FC, useState } from "react";
import { Button, ButtonTheme } from "../common/Button/Button";
import { useLazyCreateChatQuery, useGetAllChatQuery, useLazyDeleteChatQuery } from "@/lib/api/chat";
import { useGetUserQuery } from "@/lib/api/user";
import Link from "next/link";

interface ChatSidebarInterface {
}

export const ChatSidebar: FC<ChatSidebarInterface> = ({ }) => {

    const [sidebarOpen, setSidebarOpen] = useState(false)
    const { data: userData } = useGetUserQuery('')
    const { data: allChats, isSuccess, refetch: refetchChats } = useGetAllChatQuery(userData?.profile.uuid, { skip: !userData?.profile?.uuid })
    const [createChat] = useLazyCreateChatQuery()
    const [deleteChat] = useLazyDeleteChatQuery()
    const handleClick = async () => {
        if (!userData?.profile.uuid) return
        await createChat({ profileUuid: userData?.profile.uuid })
        await refetchChats()
    }
    const handleDelete = async (uuid: string) => {
        await deleteChat(uuid)
        await refetchChats()
    }
    return (
        <>
            <nav className={clsx(cls.nav, {}, [])}>
                {/* <div className={clsx(cls.wrapper, {[cls.open]: sidebarOpen, [cls.close]: !sidebarOpen,}, [])}>
                        <Sidebar setSidebarOpen={setSidebarOpen}/>
                        <button className={clsx(cls.Burger)}
                                onClick={() => setSidebarOpen(prev => !prev)}>{sidebarOpen ? '<' : '>'}</button>
                    </div> */}
                <div className={clsx(cls.wrapper, { [cls.open]: sidebarOpen, [cls.close]: !sidebarOpen, }, [])}><button className={clsx(cls.Burger)}
                    onClick={() => setSidebarOpen(prev => !prev)}>{sidebarOpen ? '<' : '>'}</button>
                    <Button theme={ButtonTheme.DEFAULT}>sad</Button>
                    <div className={clsx(cls.test)}>
                        {isSuccess && allChats.map(item =>
                            <div key={item.uuid} >
                                <Link href={`/chat/${item.uuid}`}>
                                    {item.uuid.split('-')[1]}
                                </Link>
                                <button onClick={async () => await handleDelete(item.uuid)}>
                                    delete
                                </button>
                            </div>

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