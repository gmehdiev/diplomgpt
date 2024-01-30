import Link, {LinkProps} from "next/link";
import {Dispatch, ReactNode, SetStateAction} from "react";
import clsx from "clsx";
import cls from "./UILink.module.scss";

interface UILink extends LinkProps {
    children: ReactNode,
    icon: ()=>JSX.Element,
    setSidebarOpen: Dispatch<SetStateAction<boolean>>
}
export const UILink = (props: UILink) => {
    const {href, children,icon, setSidebarOpen} = props
    return <Link className={clsx(cls.Link)} href={href} onClick={() => setSidebarOpen(prev => !prev)}> {icon()} <span>{children}</span></Link>
}

