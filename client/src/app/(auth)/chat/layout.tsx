'use client'
import { ChatSidebar } from "@/components/ChatSidebar/ChatSidebar";
import { SidebarWrapper } from "@/components/SidebarWrapper/SidebarWrapper";



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
