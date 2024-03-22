"use client";
import Link from "next/link";
import React from "react";
import logoImg from "@/assets/logo.png";
import classes from "./main-header.module.css";
import Image from "next/image";
import NavLinks from "./nav-link";
import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

function MainHeader({ params }) {
  const { data, status } = useSession();
  // console.log(status, data);
  const path = usePathname();
  const currentLocale = path.split("/")[1];

  const getLocaleSwitch = () => {
    if (currentLocale === "en") {
      return path.replace("en", "ja");
    } else {
      return path.replace("ja", "en");
    }
  };

  return (
    <header className={classes.header}>
      <Link className={classes.logo} href={"/"}>
        <Image src={logoImg} alt="A plate with food on it" priority />
        Next Level Food
      </Link>
      <nav className={classes.nav}>
        <ul>
          <NavLinks href={"/meals"} childrenValue={"Browse Meals"} />
          <NavLinks href={"/community"} childrenValue={"Foodies Community"} />
          {status === "authenticated" && (
            <NavLinks href={"/"} childrenValue={data?.user?.email}></NavLinks>
          )}
          <NavLinks href={getLocaleSwitch()} childrenValue={currentLocale} />


          {status === "authenticated" && (
            <button onClick={signOut}>Logout</button>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default MainHeader;
