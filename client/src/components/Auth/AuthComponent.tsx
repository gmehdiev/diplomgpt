import clsx from "clsx";
import cls from "./AuthCompnent.module.scss";
import { useState } from "react";
import { LoginForm } from "./LoginForm/LoginForm";
import { RegistrationForm } from "./RegistrationForm/RegistrationForm";

export const AuthComponent = () => {
    const [login, setLogin] = useState(true);
    return <div className={clsx(cls.wrapper)}>
        <div className={clsx(cls.subWrapper)}>
            {login ? <LoginForm /> : <RegistrationForm />}
            <button onClick={() => setLogin((prev) => !prev)} className={clsx(cls.button)}>
                {login ? "Нет аккаунта" : "Есть аккаунт"}
            </button>
        </div>

    </div>
}