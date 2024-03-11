'use client'
import clsx from "clsx";
import cls from "./ChatSidebar.module.scss";
import {FC, useState} from "react";
import { Button, ButtonTheme } from "../common/Button/Button";

interface ChatSidebarInterface {
}

export const ChatSidebar: FC<ChatSidebarInterface> = ({  }) => {

    const [sidebarOpen, setSidebarOpen ] = useState(false)

    return (
        <>
            <nav className={clsx(cls.nav, {}, [])}>
                    {/* <div className={clsx(cls.wrapper, {[cls.open]: sidebarOpen, [cls.close]: !sidebarOpen,}, [])}>
                        <Sidebar setSidebarOpen={setSidebarOpen}/>
                        <button className={clsx(cls.Burger)}
                                onClick={() => setSidebarOpen(prev => !prev)}>{sidebarOpen ? '<' : '>'}</button>
                    </div> */}
                    <Button theme={ButtonTheme.DEFAULT}>sad</Button>
            </nav>
        </>
    );
};
