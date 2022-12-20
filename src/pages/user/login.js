import React, { useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";

const Login = () => {
  const { data: session, status } = useSession();
  const handleSignIn = async (e) => {
    signIn(e.target.name, { callbackUrl: "http://localhost:3000" });
  };

  return (
    <>
      <h1>LOGIN</h1>
      <button name="google" onClick={handleSignIn}>
        Google
      </button>
      <button name="facebook" onClick={handleSignIn}>
        Facebook
      </button>
      <button name="github" onClick={handleSignIn}>
        Github
      </button>
    </>
  );
};

export default Login;
