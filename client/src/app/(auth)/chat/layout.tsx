'use client'
import { ChatSidebar } from "@/components/ChatSidebar/ChatSidebar";



export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <>
      <ChatSidebar />
      {children}
    </>
  );
}
