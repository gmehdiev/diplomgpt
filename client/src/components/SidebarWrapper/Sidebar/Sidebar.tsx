import clsx from "clsx";
import cls from "@/components/SidebarWrapper/Sidebar/Sidebar.module.scss";
import Link from "next/link";
import {ThemeSwitcher} from "@/components/ThemeSwitcher/ThemeSwitcher";
import {ReactNode} from "react";
import {ChatIcon} from "../../../../public/icons/sidebar/chat.icon";
import {ImageIcon} from "../../../../public/icons/sidebar/image.icon";
import Image from "next/image";
import {UILink} from "@/components/common/UILink/UILink";
interface SidebarInterface {
    children: ReactNode;
    sidebarOpen:boolean
    isCollapsed: boolean
}

export const Sidebar = ({children, sidebarOpen, isCollapsed}: SidebarInterface) => {
    return <div className={clsx(cls.wrapper)} >
        {sidebarOpen && <div className={clsx(cls.Sidebar)}>
            <Image
                src="/image/logo.jpg"
                alt="хомяк с пистолетом"
                width={100}
                height={100}
            />
            {/*<Link href="/chat"><ChatIcon/> {!isCollapsed && <span>Chat</span>}</Link>*/}
            <UILink href="/chat" icon={ChatIcon} isCollapsed={isCollapsed} >Chat</UILink>
            <UILink href="/image" icon={ImageIcon} isCollapsed={isCollapsed} >Image</UILink>
            <ThemeSwitcher/>
        </div>}
        <div className={clsx(cls.children)}>{children}</div>
    </div>

}