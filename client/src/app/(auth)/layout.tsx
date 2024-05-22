'use client'
import { SidebarWrapper } from "@/components/SidebarWrapper/SidebarWrapper";
import { Loader } from "@/components/common/Loader/Loader";
import { useGetUserQuery } from "@/lib/api/user";
import { useRouter } from "next/navigation";



export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: userData, isLoading } = useGetUserQuery('')
  const router = useRouter()
  if (!userData?.user.uuid) {
    router.push('/')
  }

  if (isLoading) return <Loader />
  return (
    <>
      {userData?.user.uuid && <><SidebarWrapper /> {children}</>}
    </>
  );
}
