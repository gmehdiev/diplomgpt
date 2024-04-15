import hljs from "highlight.js";
import { useEffect, useRef } from "react";
import "highlight.js/styles/atom-one-dark.css";
import clsx from "clsx"
import cls from "./CodeBlock.module.scss"
import { CopyIcon } from "../../../public/icons/chat/copy.icon";

hljs.configure({
    theme: 'atom-one-dark',
});
export const CodeBlock = ({ children }: { children: string }) => {
    const codeRef = useRef(null);
    useEffect(() => {
        if (codeRef.current) {
            hljs.highlightElement(codeRef.current);

        }
    }, [children]);
    return <div className={clsx(cls.code)}>
        <button className={clsx(cls.copyButton)}
            onClick={async () => await navigator.clipboard.writeText(children.split('\n').slice(1, -1).join('\n'))}
        ><CopyIcon /></button>
        <code ref={codeRef}>

            {children.split('\n')
                .slice(1, -1)
                .join('\n')}
        </code></div >
}