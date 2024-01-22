import clsx from "clsx";
import cls from "./Button.module.scss";
import { ButtonHTMLAttributes, FC, memo, useState } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  theme: ButtonTheme;
}

export enum ButtonTheme {
  BLUE = "blue",
}

export const Button: FC<ButtonProps> = memo((props) => {
  const { children, className, theme, ...other } = props;
  return (
    <button
      className={clsx(cls.Button, {}, [className, cls[theme]])}
      {...other}
    >
      {children}
    </button>
  );
});
