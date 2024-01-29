'use client'
import clsx from "clsx";
import cls from "./SidebarWrapper.module.scss";
import {FC, ReactNode, useState} from "react";
import {Sidebar} from "@/components/SidebarWrapper/Sidebar/Sidebar";

interface SidebarWrapperInterface {
  children: ReactNode;
}

export const SidebarWrapper: FC<SidebarWrapperInterface> = ({ children }) => {

  const [isCollapsed, setIsCollapsed] = useState(false)
    const [sidebarOpen, setSidebarOpen ] = useState(true)
    return (
        <>
            <div className={clsx(cls.wrapper, {[cls.collapsed]: isCollapsed}, [])}>

                <Sidebar sidebarOpen={sidebarOpen} isCollapsed={isCollapsed}>
                    {sidebarOpen &&
                        <button className={clsx(cls.Button)} onClick={() => setIsCollapsed(prev => !prev)}>
                            s
                        </button>}
                    {children}
                </Sidebar>
            </div>
            <button className={clsx(cls.Burger)} onClick={() => setSidebarOpen(prev => !prev)}>AS</button>
        </>
    )
};
