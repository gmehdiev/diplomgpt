import { ComponentProps, FC, ForwardedRef, forwardRef } from "react";
import cls from "./ResizableTextarea.module.scss";
import clsx from "clsx";

interface ResizableTextareaProps extends ComponentProps<"textarea"> {
  textareaRef: ForwardedRef<HTMLTextAreaElement>;
}

export const ResizableTextArea = forwardRef<
  HTMLDivElement,
  ResizableTextareaProps
>(({ value, textareaRef, ...rest }, ref) => {
  return (
    <div className={clsx(cls.textarea)}>
      <div className={clsx(cls.textareaControl)} data-view="fake">
        {value} <br />
      </div>
      <textarea
        {...rest}
        className={clsx(cls.textareaControl)}
        data-view="native"
        value={value}
        ref={textareaRef}
      />
    </div>
  );
});
