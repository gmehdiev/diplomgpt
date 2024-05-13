import clsx from "clsx";
import cls from "./LoginForm.module.scss";
import { EmailIcon } from "../../../../public/icons/auth/email.icon";
import { PasswordIcon } from "../../../../public/icons/auth/password.icon";
import { Input } from "../../common/Input/Input";
import { Button, ButtonTheme } from "../../common/Button/Button";
import { useThunkDispatch } from "@/lib/redux/hooks";
import { handleLogin } from "@/lib/redux/slices/auth.slice";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { loginSchema } from "@/lib/helpers/schemas/LoginSchema";

export const LoginForm = () => {
  const dispatch = useThunkDispatch();
  const router = useRouter()
  interface LoginIntreface {
    email: string
    password: string
  }
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LoginIntreface>({
    resolver: yupResolver(loginSchema),
  })
  const onSubmit: SubmitHandler<LoginIntreface> = async (data) => {

    dispatch(handleLogin({ ...data, rememberMe: false })).then((value) => {
      if (value.meta.requestStatus === 'fulfilled') {
        router.push('chat')
      }
    });
  }

  return (
    <div className={clsx(cls.box)}>
      <h2>Добро пожаловать назад</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Почта"
          icon={<EmailIcon />}
          {...register("email")}
          error={errors.email?.message}
        />
        <Input
          label="Пароль"
          type="password"
          isPassword
          icon={<PasswordIcon />}
          error={errors.password?.message}

          {...register("password")}
        />
        <Button theme={ButtonTheme.BLUE} type="submit">
          Войти
        </Button>
      </form>
    </div>
  );
};
