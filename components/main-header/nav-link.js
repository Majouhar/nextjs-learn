"use client";
import React from "react";
import classes from "./nav-link.module.css";
import { usePathname } from "next/navigation";
import Link from "next/link";

function NavLinks({ href, childrenValue }) {
  const path = usePathname();
  return (
    <li>
      <Link
        href={href}
        className={path.startsWith(href) ? classes.active : undefined}
      >
        {childrenValue}
      </Link>
    </li>
  );
}

export default NavLinks;
