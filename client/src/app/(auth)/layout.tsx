import { SidebarWrapper } from "@/components/SidebarWrapper/SidebarWrapper";



export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SidebarWrapper /> {children}
    </>
  );
}
