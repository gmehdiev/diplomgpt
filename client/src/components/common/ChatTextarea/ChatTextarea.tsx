import clsx from "clsx"
import cls from "./ChatTextarea.module.scss"
import { Button, ButtonTheme } from "../Button/Button"
import { ClassAttributes, useEffect, useRef, useState } from "react";
import { ResizableTextArea } from "../ResizableTextarea/ResizableTextarea";
import { ChatIcon } from "../../../../public/icons/sidebar/chat.icon";
interface Props {
    handleClick: (value: string) => void
}

export const ChatTextarea = ({ handleClick }: Props) => {

    const [value, setValue] = useState("");

    return <div className={clsx(cls.Wrapper)}>
        <ChatIcon className={clsx(cls.Icon)} />
        <ResizableTextArea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Введите что нибудь" />

        <Button className={clsx(cls.Button)} theme={ButtonTheme.DEFAULT}
            onClick={() => {
                handleClick(value);
            }}>as</Button>
    </div>
}