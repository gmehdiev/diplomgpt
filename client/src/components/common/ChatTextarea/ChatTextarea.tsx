import clsx from "clsx";
import cls from "./ChatTextarea.module.scss";
import { Button, ButtonTheme } from "../Button/Button";
import { ClassAttributes, useEffect, useRef, useState } from "react";
import { ResizableTextArea } from "../ResizableTextarea/ResizableTextarea";
import { ChatIcon } from "../../../../public/icons/sidebar/chat.icon";
import { SendIcon } from "../../../../public/icons/chat/send.icon";
interface Props {
  handleClick: (value: string) => void;
}

export const ChatTextarea = ({ handleClick }: Props) => {
  const [value, setValue] = useState("");
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleClick(value);
        setValue("");
      }
    };

    if (textAreaRef.current) {
      textAreaRef.current.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      if (textAreaRef.current) {
        textAreaRef.current.removeEventListener("keydown", handleKeyDown);
      }
    };
  }, [value, handleClick]);
  return (
    <div className={clsx(cls.Wrapper)}>
      <ChatIcon className={clsx(cls.Icon)} />
      <ResizableTextArea
        textareaRef={textAreaRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Введите что нибудь"
      />

      <Button
        className={clsx(cls.Button)}
        theme={ButtonTheme.DEFAULT}
        onClick={() => {
          handleClick(value);
          setValue("");
        }}
      >
        <SendIcon className={clsx(cls.SendButton)} />
      </Button>
    </div>
  );
};
