import React, { useEffect, useState } from "react";
import { useSession, signIn, signOut, getSession } from "next-auth/react";
import style from "./index.module.css";
import Link from "next/link";
import { useRouter } from "next/router";

const Header = () => {
  const { data: session } = useSession();
  const [userData, setUserData] = useState({});
  const [user, setUser] = useState({});
  const router = useRouter();
  useEffect(() => {
    if (session) {
      fetch("/api/auth/user", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => response.json())
        .then((data) => {
          window.localStorage.setItem(
            "LoggedInUser",
            JSON.stringify({ username: data?.username })
          );
        })
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
        <div className={style.home}>
          <Link href={"/"}>GENERATOR AI</Link>
        </div>
        <div className={style.navbarMenu}>
          {session ? (
            <>
              <div className={style.signout} onClick={handleSignOut}>
                LOGOUT
              </div>
              <div></div>
              <Link href={"/user/profile"}>
                <p>{user?.username}</p>
              </Link>
            </>
          ) : (
            <div className={style.login}>
              <Link href={"/user/login"}>Login</Link>
            </div>
          )}
          <div className={style.FAQ}>
            <Link href={"/faq"}>FAQ</Link>
          </div>
        </div>
      </div>

      <div
        className={
          router.pathname === "/user/payment"
            ? style.disableButton
            : style.generatorButton
        }
      ></div>
    </>
  );
};

export default Header;
