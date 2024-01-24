// import { LoginForm } from "@/components/LoginForm/LoginForm";
// import { RegistrationForm } from "@/components/RegistrationForm/RegistrationForm";
// import { useThunkDispatch } from "@/lib/redux/hooks";
// import { checkAuth, handleRegister } from "@/lib/redux/slices/auth.slice";
// import { useEffect, useState } from "react";

import {cookies} from "next/headers";
'use client'


export default function Chat() {
    async function setTheme() {
        const response = await fetch('http://localhost:8080/api/theme', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({A: 'A A'})

        })
        return response.json()
    }

    return (
        <main>
            {/* {login ? <LoginForm /> : <RegistrationForm />}
      <button onClick={() => setLogin((prev) => !prev)}>
        {login ? "нет аккаунта" : "есть аккаунт"}
      </button> */}
            {/*вы авторизованны*/}
            <button onClick={
                setTheme
            }>
                asdasdasd
            </button>
        </main>
    );
}
