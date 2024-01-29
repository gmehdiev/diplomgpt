import { cookieTheme } from '@/lib/theme/theme.helper';
import {NextResponse} from "next/server";
import {cookies} from "next/headers";

const THEME_DARK = 'dark';
const THEME_LIGHT = 'light';


export async function GET() {
    const theme = cookieTheme();
    console.log(theme)
   return NextResponse.json({theme:theme?.value
} );
}

export async function POST(req: Request) {
    const theme = await req.json()
    const cookieStore = cookies();
    cookieStore.set('theme', theme.theme, {
        maxAge: 2592000000,
        httpOnly: false,
        sameSite: 'lax',
        path: '/'
    })
    return  NextResponse.json({theme: theme.theme})

}

