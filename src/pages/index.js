import { useSession } from "next-auth/react";
import Head from "next/head";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import { TypeAnimation } from "react-type-animation";

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("/api", { method: "GET" })
      .then((response) => response.json())
      .then((data) => setPosts(data));
  }, []);

  return (
    <>
      <main className={styles.main}>
        <div className={styles.mainWrapper}>
          <div className={styles.title}>
            <h1>BY COMMUNITY</h1>
          </div>
          <div className={styles.mainContainer}>
            <>
              {posts &&
                posts.map((post, index) => (
                  <div className={styles.card} key={index}>
                    <div className={styles.cardHeader}>
                      <Link
                        href={
                          post.user.user === "Anonymous"
                            ? ""
                            : `/user/${post.user.id}`
                        }
                      >
                        <p>{post.user.user}</p>
                      </Link>
                    </div>
                    <div className={styles.rawTextBox}>
                      <p>&quot;{post.rawText}&quot;</p>
                    </div>

                    <div className={styles.textBox}>
                      <p className={styles.generatedText}>
                        {post.generatedText}
                      </p>
                    </div>

                    <div className={styles.imageContainer}>
                      {post.generatedImages.map((image) => (
                        <>
                          <img
                            className={styles.generatedImages}
                            src={image}
                          ></img>
                        </>
                      ))}
                    </div>
                  </div>
                ))}
            </>
          </div>
        </div>
      </main>
    </>
  );
}
