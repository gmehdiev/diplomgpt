import { rename, useLazyDeleteChatQuery, useLazyRenameChatQuery } from "@/lib/api/chat"
import { ChatInterface } from "@/lib/types/ChatInterface"
import { QueryActionCreatorResult } from "@reduxjs/toolkit/query/react";
import clsx from "clsx";
import cls from './ChatLink.module.scss'
import Link from "next/link"
import { useState } from "react";

interface Props {
    chat: ChatInterface,
    refetch(): QueryActionCreatorResult<any>;
}

export const ChatLink = (props: Props) => {
    const { chat, refetch } = props
    const [deleteChat] = useLazyDeleteChatQuery()
    const [renameChat] = useLazyRenameChatQuery()
    const [name, setName] = useState('')
    const handleDelete = async (uuid: string) => {
        await deleteChat(uuid)
        await refetch()
    }

    const handleRename = async (body: rename) => {
        await renameChat(body)
        await refetch()
        setEditMode(prev => !prev)
    }
    const [editMode, setEditMode] = useState(false)
    if (editMode) return <div className={clsx(cls.wrapper)}>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        <button onClick={async () => { handleRename({ uuid: chat.uuid, name }) }}>save</button>
    </div>
    return <div className={clsx(cls.wrapper)}>


        <Link href={`/chat/${chat.uuid}`}>
            {chat.name || chat.uuid.split('-')[1]}
        </Link>
        <button onClick={async () => await handleDelete(chat.uuid)}>
            delete
        </button>
        <button onClick={() => { setEditMode(prev => !prev) }}>
            rename
        </button>
    </div>
}