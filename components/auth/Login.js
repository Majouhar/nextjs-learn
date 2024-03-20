"use client";
import { useAuth } from "@/store/custom-authentication";
import { useRef, useState } from "react";
import classes from "./login.module.css";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

function Login() {
  // const { login } = useAuth();
  const [isExistingUser, setIsExistinUser] = useState(true);
  const emailRef = useRef();
  const passRef = useRef();
  const router = useRouter();
  const handleLogin = async (e) => {
    // console.log("IAM HERE");
    e.preventDefault();
    if (!isExistingUser) {
      fetch("/api/auth", {
        method: "POST",
        body: JSON.stringify({
          email: emailRef.current.value,
          password: passRef.current.value,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((r) => r.json())
        .then((d) => {
          setIsExistinUser(true);
        });
    } else {
      // console.log("Hii");
      const result = await signIn("credentials", {
        redirect: false,
        email: emailRef.current.value,
        password: passRef.current.value,
      });
      if (!result.error) {
        const callbackUrl = new URLSearchParams(result.url.split("?")[1]);
        router.replace(callbackUrl.get("callbackUrl"));
      }
    }
  };
  return (
    <section className={classes.auth}>
      <h1>{isExistingUser ? "Log In" : "Sign Up"}</h1>
      <form onSubmit={handleLogin}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" ref={emailRef} id="email" required />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input type="password" ref={passRef} id="password" required />
        </div>
        <div className={classes.actions}>
          <button>{isExistingUser ? "Login" : "Create Account"}</button>
          <button
            type="button"
            className={classes.toggle}
            onClick={() => setIsExistinUser((prev) => !prev)}
          >
            {isExistingUser
              ? "Create new account"
              : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
}

export default Login;
