import clsx from "clsx";
import cls from "./Sidebar.module.scss";
import Link from "next/link";
import { FC, ReactNode } from "react";
import {ThemeSwitcher} from "@/components/ThemeSwitcher/ThemeSwitcher";

interface SidebarInterface {
  children: ReactNode;
}

export const Sidebar: FC<SidebarInterface> = ({ children }) => {
  return (
    <div className={clsx(cls.wrapper)}>
      <div className={clsx(cls.Sidebar)}>
        <Link href="">asd</Link>
        <Link href="">asd</Link>
        <Link href="">asd</Link>
          <ThemeSwitcher/>
      </div>
      <div className={clsx(cls.children)}>{children}</div>
    </div>
  );
};
