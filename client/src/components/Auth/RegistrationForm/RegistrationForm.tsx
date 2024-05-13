import clsx from "clsx";
import cls from "./Registration.module.scss";
import { EmailIcon } from "../../../../public/icons/auth/email.icon";
import { PasswordIcon } from "../../../../public/icons/auth/password.icon";
import { Input } from "../../common/Input/Input";
import Image from "next/image";
import { Button, ButtonTheme } from "../../common/Button/Button";
import { useThunkDispatch } from "@/lib/redux/hooks";
import { handleRegister } from "@/lib/redux/slices/auth.slice";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerSchema } from "@/lib/helpers/schemas/RegisterSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";

export const RegistrationForm = () => {
  const router = useRouter()
  const dispatch = useThunkDispatch();

  interface RegisterInterface {
    email: string
    password: string
    passwordRepeat: string
  }
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterInterface>({
    resolver: yupResolver(registerSchema),
  })
  const onSubmit: SubmitHandler<RegisterInterface> = async (data) => {
    dispatch(handleRegister(data)).then((value) => {
      if (value.meta.requestStatus === 'fulfilled') {
        router.push('chat')
      }
    });
  }
  return (
    <div className={clsx(cls.box)}>
      <h2>Регистрация</h2>
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
          {...register("password")}
          error={errors.password?.message}
        />
        <Input
          label="Повтори пароль"
          type="password"
          isPassword
          icon={<PasswordIcon />}
          {...register("passwordRepeat")}
          error={errors.passwordRepeat?.message}

        />
        <Button theme={ButtonTheme.BLUE} type="submit" >
          Зарегистрироваться
        </Button>
      </form>
    </div>
  );
};
