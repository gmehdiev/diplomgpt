"use client";
import { LoginForm } from "@/components/LoginForm/LoginForm";
import { RegistrationForm } from "@/components/RegistrationForm/RegistrationForm";
import { useThunkDispatch } from "@/lib/redux/hooks";
import { checkAuth, handleRegister } from "@/lib/redux/slices/auth.slice";
import { useEffect, useState } from "react";

export default function Home() {


  const [login, setLogin] = useState(true);

  return (
    <main>
      {login ? <LoginForm /> : <RegistrationForm />}
      <button onClick={() => setLogin((prev) => !prev)}>
        {login ? "нет аккаунта" : "есть аккаунт"}
      </button>
    </main>
  );
}
