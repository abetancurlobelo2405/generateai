import React, { useEffect, useState } from "react";
import { useSession, signIn, signOut, getSession } from "next-auth/react";
import Link from "next/link";

const Header = () => {
  const { data: session } = useSession();
  const [user, setUser] = useState({});

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
      {session ? (
        <>
          <Link href={"/user/profile"}>
            <p>{user?.username}</p>
          </Link>
          <button onClick={handleSignOut}>Sign out</button>
        </>
      ) : (
        <Link href={"/user/login"}>Login</Link>
      )}
      <div>
        <Link href={"/xd"}>test</Link>
      </div>
      <div>
        <Link href={"/user/generate"}>Generator</Link>
      </div>
      <div>
        <Link href={"/"}>HOME</Link>
      </div>
    </>
  );
};

export default Header;
