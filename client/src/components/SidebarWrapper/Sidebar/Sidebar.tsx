import clsx from "clsx";
import cls from "@/components/SidebarWrapper/Sidebar/Sidebar.module.scss";
import Link from "next/link";
import {ThemeSwitcher} from "@/components/ThemeSwitcher/ThemeSwitcher";
import {Dispatch, ReactNode, SetStateAction} from "react";
import {ChatIcon} from "../../../../public/icons/sidebar/chat.icon";
import {ImageIcon} from "../../../../public/icons/sidebar/image.icon";
import Image from "next/image";
import {UILink} from "@/components/common/UILink/UILink";
interface SidebarInterface {
    setSidebarOpen:  Dispatch<SetStateAction<boolean>>
}

export const Sidebar = ({setSidebarOpen}: SidebarInterface) => {
    return <div className={clsx(cls.wrapper)}>
        <div className={clsx(cls.Sidebar)}>
            {/* <Image
                src="/image/logo.jpg"
                alt="хомяк с пистолетом"
                width={100}
                height={100}
            /> */}
            <UILink href="/chat" icon={ChatIcon}  setSidebarOpen={setSidebarOpen}>Chat</UILink>
            <UILink href="/image" icon={ImageIcon}  setSidebarOpen={setSidebarOpen}>Image</UILink>
            <ThemeSwitcher/>
        </div>
        {/*<div className={clsx(cls.children)}>{children}</div>*/}
    </div>;

}