'use client'
import clsx from "clsx";
import cls from "./SidebarWrapper.module.scss";
import { FC, useState } from "react";
import { Sidebar } from "@/components/SidebarWrapper/Sidebar/Sidebar";
import { ArrowIcon } from "../../../public/icons/sidebar/arrow.icon";

interface SidebarWrapperInterface {
}

export const SidebarWrapper: FC<SidebarWrapperInterface> = ({ }) => {

    const [sidebarOpen, setSidebarOpen] = useState(false)
    return (
        <>
            <nav className={clsx(cls.nav, {}, [])}>
                <div className={clsx(cls.wrapper, { [cls.open]: sidebarOpen, [cls.close]: !sidebarOpen, }, [])}>
                    <Sidebar setSidebarOpen={setSidebarOpen} />
                    <button className={clsx(cls.Burger)}
                        onClick={() => setSidebarOpen(prev => !prev)}> <ArrowIcon className={clsx(cls.arrow, { [cls.rotate]: sidebarOpen })} /> </button>
                </div>
            </nav>
        </>
    );
};
