import { ComponentProps, FC } from "react";
import  cls  from "./ResizableTextarea.module.scss";
import clsx from "clsx";

export const ResizableTextArea: FC<ComponentProps<"textarea">> = (props) => {
  const { value, ...rest } = props;

  return (
    <div  className={clsx(cls.textarea)}>
      <div className={clsx(cls.textareaControl)}  data-view="fake">
        {value} <br />
      </div>
      <textarea
        {...rest}
        className={clsx(cls.textareaControl)}
        data-view="native"
        value={value}
      />
    </div>
  );
};
