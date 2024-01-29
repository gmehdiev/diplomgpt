
import {cookies} from "next/headers";

const THEME_DARK = 'dark';
const THEME_LIGHT = 'light';

export const cookieTheme = () => {
    const cookieStore = cookies()
    const asdasd = cookies().getAll()
    console.log(asdasd)
    const a = cookieStore.get('theme')
     console.log(a)
     return  cookieStore.get('theme')
};

export const setCookieTheme = () => {
    const cookieStore = cookies()
    cookieStore.set('theme', THEME_DARK)
    return  cookieStore.get('theme')
};