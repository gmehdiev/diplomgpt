import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./index.scss";
import StoreProvider from "./StoreProvider";
import clsx from "clsx";
import { cookies } from "next/headers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chat gpt",
  // description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies()
  const theme = cookieStore.get('theme')?.value

  return (
    <StoreProvider>
      <html lang="en" data-theme={theme}>
        <body className={clsx(inter.className, {}, [])}>
          {children}
        </body>
      </html>
    </StoreProvider>
  );
}
