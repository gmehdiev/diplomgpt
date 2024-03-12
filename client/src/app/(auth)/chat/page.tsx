'use client'
import clsx from "clsx";
import cls from "./Chat.module.scss";
import { socket } from "@/socket";
import { useEffect, useState } from "react";
import { ConnectionManager } from "@/components/Sockets/ConnectionManages";
import { ConnectionState } from "@/components/Sockets/ConnectionState";
import { ChatTextarea } from "@/components/common/ChatTextarea/ChatTextarea";
import { ChatComponent } from "@/components/ChatComponent/ChatComponent";

export default function Chat() {

    return (
        <main>
            <ChatComponent />
        </main>
    );
}
