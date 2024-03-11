import clsx from "clsx";
import cls from "./LoginForm.module.scss";
import { EmailIcon } from "../../../public/icons/auth/email.icon";
import { PasswordIcon } from "../../../public/icons/auth/password.icon";
import { Input } from "../common/Input/Input";
import Image from "next/image";
import { Button, ButtonTheme } from "../common/Button/Button";
import { useThunkDispatch } from "@/lib/redux/hooks";
import { handleLogin } from "@/lib/redux/slices/auth.slice";
import { useState } from "react";

export const LoginForm = () => {
  const dispatch = useThunkDispatch();
  const [value, setValue] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const submit = (e: any) => {
    e.preventDefault();
    dispatch(handleLogin(value));
  };
  return (
    <div className={clsx(cls.box)}>
      {/* <Image
        src="/image/logo.jpg"
        alt="хомяк с пистолетом"
        width={100}
        height={100}
      /> */}
      <h2>Добро пожаловать назад</h2>
      <form action="">
        <Input
          label="email"
          icon={<EmailIcon />}
          value={value.email}
          onChange={(e) =>
            setValue((prev) => ({
              ...prev,
              email: e.target.value,
            }))
          }
        />
        <Input
          label="password"
          type="password"
          isPassword
          icon={<PasswordIcon />}
          value={value.password}
          onChange={(e) =>
            setValue((prev) => ({
              ...prev,
              password: e.target.value,
            }))
          }
        />
        <Button theme={ButtonTheme.BLUE} type="submit" onClick={submit}>
          asdasd
        </Button>
      </form>
    </div>
  );
};
