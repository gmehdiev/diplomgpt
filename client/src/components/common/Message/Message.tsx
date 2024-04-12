import cls from './Message.module.scss'
import Image from 'next/image'
import hamster from '../../../../public/image/logo.jpg'
import user from '../../../../public/image/user.jpg'
import clsx from 'clsx'

interface Message {
    role: string,
    content: string
}

export const Message = (props: Message) => {
    const { role, content } = props
    console.log(role)
    return <div className={clsx(cls.wrapper, { [cls.user]: role === 'user', [cls.assistant]: role === 'assistant' })}>
        <div className={cls.roleWrapper}>
            <Image src={role === 'assistant' ? hamster : user} width={48} height={48} alt="asd" className={cls.image} />
            <span className={cls.role}>{role}</span>
        </div>


        <pre className={cls.pre}>
            {content}
        </pre>
    </div>
}