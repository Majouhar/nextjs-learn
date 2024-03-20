"use client";
import Link from "next/link";
import React from "react";
import logoImg from "@/assets/logo.png";
import classes from "./main-header.module.css";
import Image from "next/image";
import NavLinks from "./nav-link";
import { signOut, useSession } from "next-auth/react";

function MainHeader() {
  const { data, status } = useSession();
  // console.log(status, data);

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
          {status === "authenticated" && (
            <button onClick={signOut}>Logout</button>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default MainHeader;
