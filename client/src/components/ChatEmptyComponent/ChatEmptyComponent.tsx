import { ChatTextarea } from "../common/ChatTextarea/ChatTextarea"
import clsx from "clsx"
import cls from "./ChatEmptyComponent.module.scss"
import { useCreateChatMutation } from "@/lib/api/chat"
import { useGetUserQuery } from "@/lib/api/user"
import { useRouter, useSearchParams } from "next/navigation";


export const ChatEmptyComponent = () => {

    const router = useRouter()
    const { data: userData } = useGetUserQuery('')
    const [createChat] = useCreateChatMutation()
    const searchParams = useSearchParams()

    const createQueryString =
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString())
            params.set(name, value)

            return params.toString()
        }

    const handleCreateChat = async () => {
        if (!userData?.profile.uuid) return
        const chatData = await createChat({ profileUuid: userData?.profile.uuid })
        if ('data' in chatData) {
            console.log(chatData.data.uuid)
            return chatData
        } else {
            console.log('Error:', chatData.error)
            return null
        }

    }
    const handleClick = async (value: string) => {
        const chatData = await handleCreateChat()
        if (chatData) {
            console.log(chatData.data.uuid)
            router.push('/chat/' + chatData.data.uuid + '?' + createQueryString('text', value))
        }

    }

    return <div className={clsx(cls.Wrapper)}>
        <ChatTextarea handleClick={handleClick} />
    </div>
}
