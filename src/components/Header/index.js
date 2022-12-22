import React, { useEffect, useState } from "react";
import { useSession, signIn, signOut, getSession } from "next-auth/react";
import style from "./index.module.css";
import Link from "next/link";
import { useRouter } from "next/router";

const Header = () => {
  const { data: session } = useSession();
  const [user, setUser] = useState({});
  const router = useRouter();

  useEffect(() => {
    if (session) {
      fetch("/api/auth/user", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => response.json())
        .then((data) =>
          window.localStorage.setItem(
            "LoggedInUser",
            JSON.stringify({ username: data?.username })
          )
        )
        .then(() => {
          const storedUsername = window.localStorage.getItem("LoggedInUser");
          setUser(JSON.parse(storedUsername));
        });
    }
  }, [session]);

  const handleSignOut = () => {
    signOut();
  };
  return (
    <>
      <div className={style.navbar}>
        {session ? (
          <>
            <Link href={"/user/profile"}>
              <p>{user?.username}</p>
            </Link>
            <button onClick={handleSignOut}>Sign out</button>
          </>
        ) : (
          <div className={style.login}>
            <Link href={"/user/login"}>Login</Link>
          </div>
        )}
        <div className={style.home}>
          <Link href={"/"}>GENERATOR AI</Link>
        </div>
      </div>

      <div
        className={
          router.pathname === "/user/generate"
            ? style.disableButton
            : style.generatorButton
        }
      >
        <Link href={"/user/generate"}>
          <button className={style.rainbowButton}>
            ¡GENERATE YOU OWN HISTORY NOW!
          </button>
        </Link>
      </div>
    </>
  );
};

export default Header;
