import Link, {LinkProps} from "next/link";
import {Dispatch, ReactNode, SetStateAction} from "react";
import clsx from "clsx";
import cls from "./UILink.module.scss";
import { SvgIconInterface } from "../../../../public/icons/SvgIconInterface";

interface UILink extends LinkProps {
    children: ReactNode,
    Icon: (props: SvgIconInterface) => JSX.Element,
    setSidebarOpen: Dispatch<SetStateAction<boolean>>
}
export const UILink = (props: UILink) => {
    const {href, children,Icon, setSidebarOpen} = props
    return <Link className={clsx(cls.Link)} href={href} onClick={() => setSidebarOpen(prev => !prev)}> <Icon/> <span>{children}</span></Link>
}

