"use client";

import { AuthComponent } from "@/components/Auth/AuthComponent";
import { Loader } from "@/components/common/Loader/Loader";
import { useGetUserQuery } from "@/lib/api/user";
import { useRouter } from "next/navigation";

export default function Home() {
  const { data: userData, isLoading } = useGetUserQuery('')
  const router = useRouter()
  // if (userData?.user.uuid) {
  //   router.push('/chat')
  // }

  if (isLoading) return <Loader />
  return (
    <main>
      {!userData?.user.uuid && <AuthComponent />
      }
    </main>
  );
}
