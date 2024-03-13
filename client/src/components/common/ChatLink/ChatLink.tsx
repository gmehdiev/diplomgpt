import { rename, useDeleteChatMutation, useRenameChatMutation } from "@/lib/api/chat"
import { ChatInterface } from "@/lib/types/ChatInterface"
import { QueryActionCreatorResult } from "@reduxjs/toolkit/query/react";
import clsx from "clsx";
import cls from './ChatLink.module.scss'
import Link from "next/link"
import { useState } from "react";
import { TrashIcon } from "../../../../public/icons/chat/trash.icon";
import { EditIcon } from "../../../../public/icons/chat/edit.icon";
import { CheckIcon } from "../../../../public/icons/chat/check.icon";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface Props {
    chat: ChatInterface,
    refetch(): QueryActionCreatorResult<any>;
}

export const ChatLink = (props: Props) => {
    const { chat, refetch } = props
    const [deleteChat] = useDeleteChatMutation()
    const [renameChat] = useRenameChatMutation()
    const [name, setName] = useState('')
    const pathname = usePathname()


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
        <input className={cls.input} type="text" value={name} onChange={(e) => setName(e.target.value)} />
        <button className={cls.button} onClick={async () => { handleRename({ uuid: chat.uuid, name }) }}><CheckIcon className={cls.icon} /></button>
    </div>
    return <div className={clsx(cls.wrapper, { [cls.selected]: pathname.split('/')[2] === chat.uuid })}>


        <Link href={`/chat/${chat.uuid}`} className={cls.Link}>
            {chat.name || chat.uuid.split('-')[1]}
        </Link>
        <div>
            <button className={cls.button} onClick={async () => await handleDelete(chat.uuid)}>
                <TrashIcon className={cls.icon} />
            </button>
            <button className={cls.button} onClick={() => { setEditMode(prev => !prev) }}>
                <EditIcon className={cls.icon} />
            </button>
        </div>

    </div>
}