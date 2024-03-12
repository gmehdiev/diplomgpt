'use client'
import { ChatComponent } from "@/components/ChatComponent/ChatComponent";
import { useRouter } from 'next/navigation'

export default function CurrentChat({ params }: { params: { id: string } }) {

    return (
        <main>
            <ChatComponent id={params.id} />
        </main>
    );
}
