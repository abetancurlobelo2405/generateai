import React, { useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import styles from "../../styles/Login.module.css";

const Login = () => {
  const { data: session, status } = useSession();
  const handleSignIn = async (e) => {
    signIn(e.target.name, { callbackUrl: "http://localhost:3000" });
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.loginContainer}>
        <h1>LOGIN</h1>
        <button className={styles.google} name="google" onClick={handleSignIn}>
          GOOGLE
        </button>
        <button
          className={styles.facebook}
          name="facebook"
          onClick={handleSignIn}
        >
          FACEBOOK
        </button>
        <button className={styles.github} name="github" onClick={handleSignIn}>
          GITHUB
        </button>
      </div>
    </div>
  );
};

export default Login;
