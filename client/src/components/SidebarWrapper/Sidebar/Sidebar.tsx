import clsx from "clsx";
import cls from "@/components/SidebarWrapper/Sidebar/Sidebar.module.scss";
import { ThemeSwitcher } from "@/components/ThemeSwitcher/ThemeSwitcher";
import { Dispatch, SetStateAction } from "react";
import { ChatIcon } from "../../../../public/icons/sidebar/chat.icon";
import { ImageIcon } from "../../../../public/icons/sidebar/image.icon";
import Image from "next/image";
import { UILink } from "@/components/common/UILink/UILink";
interface SidebarInterface {
    setSidebarOpen: Dispatch<SetStateAction<boolean>>
}
export const Sidebar = ({ setSidebarOpen }: SidebarInterface) => {


    return <div className={clsx(cls.wrapper)}>
        <div className={clsx(cls.Sidebar)}>
            <Image
                src="/image/logo.jpg"
                alt="хомяк с пистолетом"
                width={100}
                height={100}
            />
            <UILink href="/chat" Icon={ChatIcon} setSidebarOpen={setSidebarOpen}>Chat</UILink>
            <UILink href="/image" Icon={ImageIcon} setSidebarOpen={setSidebarOpen}>Image</UILink>
            <UILink href="/proxy" Icon={ImageIcon} setSidebarOpen={setSidebarOpen}>Image</UILink>

            <ThemeSwitcher />
        </div>
    </div>;

}