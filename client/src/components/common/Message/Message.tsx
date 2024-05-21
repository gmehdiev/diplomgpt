import cls from './Message.module.scss'
import Image from 'next/image'
import hamster from '../../../../public/image/logo.jpg'
import user from '../../../../public/image/user.jpg'
import clsx from 'clsx'
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';
import { useRef, useEffect, useState, memo } from 'react'
import language from 'react-syntax-highlighter/dist/esm/languages/hljs/1c'
import { CodeBlock } from '@/components/CodeBlock/CodeBlock'
import { Markdown } from './Markdown/Markdown'
interface Message {
    role: string,
    content: string
}

export const Message = memo((props: Message) => {
    const { role, content } = props
    const codeRef = useRef(null);

    useEffect(() => {
        if (codeRef.current) {
            hljs.highlightElement(codeRef.current);

        }
    }, [language, content]);

    // const regex = /(```)([\s\S]*?)\1/g;
    const regex = /(```[\s\S]*?```)/g
    let parts: any = [];
    const [reactivePaths, setReactivePaths] = useState<any[]>([]);
    useEffect(() => {

        let lastIndex = 0;
        let match;

        while ((match = regex.exec(content)) !== null) {
            if (match.index > lastIndex) {
                parts.push({
                    content: content.slice(lastIndex, match.index),
                    isCode: false,
                });
                setReactivePaths(parts)
            }
            parts.push({
                content: match[0],
                isCode: true,
            });
            setReactivePaths(parts)
            lastIndex = regex.lastIndex;
        }
        if (lastIndex < content.length) {
            parts.push({
                content: content.slice(lastIndex),
                isCode: false,
            });
            setReactivePaths(parts)
        }
    }, [content]);

    console.log(reactivePaths)

    return <div className={clsx(cls.wrapper, { [cls.user]: role === 'user', [cls.assistant]: role === 'assistant' })}>
        <div className={cls.roleWrapper}>
            <Image src={role === 'assistant' ? hamster : user} width={48} height={48} alt="asd" className={cls.image} />
            <span className={cls.role}>{role}</span>
        </div>


        <pre className={cls.pre}>
            {reactivePaths.map((parts, index) => {
                if (parts.isCode) {
                    return <CodeBlock key={index} >
                        {parts.content}
                    </CodeBlock>
                } else {
                    return <Markdown content={parts.content} key={index} />
                }
            })}
        </pre>
    </div>
})