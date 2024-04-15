import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
// import { parse } from "cookie";
import { parse, splitCookiesString } from 'set-cookie-parser'
const privateRoutes = ["/chat", '/chat/:path*', '/proxy'];

export async function middleware(request: NextRequest) {

  let cookie = request.cookies.get("refreshToken");
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("refreshToken", cookie?.value);
  const res = await fetch(`http://${process.env.NEXT_PUBLIC_API_URL}:3000/auth/refresh`, {
    method: "GET",
    headers: requestHeaders,
  });
  let response: NextResponse
  console.log(!privateRoutes.includes(request.nextUrl.pathname, res.status))
  if (res.status === 201 && !privateRoutes.includes(request.nextUrl.pathname)) {

    const absoluteURL = new URL('/chat', request.url)
      
    response = NextResponse.redirect(absoluteURL.toString())
  } else {
    response = NextResponse.next();
  }

  const cookieHeader = res.headers.getSetCookie()
  if (cookieHeader) {
    const parcesCookie = parse(splitCookiesString(cookieHeader[0]));
    const refreshToken = parcesCookie[0]
    const token = parcesCookie[1]
    if (refreshToken &&
      token) {
      response.cookies.set({
        name: refreshToken.name,
        value: refreshToken.value,
        maxAge: refreshToken.maxAge,
        path: refreshToken.path,
        expires: refreshToken.expires,
        httpOnly: refreshToken.httpOnly,
        sameSite: 'lax',
      })
      response.cookies.set({
        name: token.name,
        value: token.value,
        maxAge: token.maxAge,
        path: token.path,
        expires: token.expires,
        httpOnly: token.httpOnly,
        sameSite: 'lax',
      })
      console.log('set')
    }

  }
  if (res.status === 401 && privateRoutes.includes(request.nextUrl.pathname)) {
    const absoluteURL = new URL('/', request.nextUrl.origin)
    return NextResponse.redirect(absoluteURL.toString())
  }
  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
