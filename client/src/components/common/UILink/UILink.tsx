import Link, {LinkProps} from "next/link";
import {ReactNode} from "react";
import clsx from "clsx";
import cls from "./UILink.module.scss";

interface UILink extends LinkProps {
    children: ReactNode,
    isCollapsed?: boolean
    icon: ()=>JSX.Element
}
export const UILink = (props: UILink) => {
    const {href, isCollapsed, children,icon} = props
    return <Link className={clsx(cls.Link)} href={href}> {icon()}{!isCollapsed && <span>{children}</span>}</Link>
}

