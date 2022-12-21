import { useSession } from "next-auth/react";
import Head from "next/head";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import { connectDB } from "../lib/mongoDBconnect";
import Link from "next/link";
import Profile from "../models/Profile";

export default function Home({ posts }) {
  return (
    <>
      <main>
        <div className={styles.header}>
          <div className={styles.image}></div>
          <div className={styles.image2}></div>
        </div>

        <h1>Community Histories!</h1>
        {posts
          ? posts.map((post, index) => (
              <div key={index}>
                {post.histories.map((history, index) => (
                  <div key={index}>
                    <p>&quot;{history.rawText}&quot;</p>
                    <p>{history.generatedText}</p>
                    <Link
                      href={
                        history.author === "Anonymous"
                          ? ""
                          : `/user/${post._id}`
                      }
                    >
                      <p>{history.author}</p>
                    </Link>
                  </div>
                ))}
              </div>
            ))
          : undefined}
      </main>
    </>
  );
}

export async function getServerSideProps({ req, res }) {
  connectDB();
  const posts = JSON.stringify(await Profile.find({}));

  return {
    props: { posts: JSON.parse(posts) },
  };
}
