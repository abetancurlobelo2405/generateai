import { useSession } from "next-auth/react";
import Head from "next/head";
import { useEffect, useState } from "react";
import PayPalComponent from "../components/PaypalComponent";
import { connectDB } from "../lib/mongoDBconnect";
import Link from "next/link";
import Profile from "../models/Profile";

export default function Home({ posts }) {
  return (
    <>
      <h1>Hola</h1>
      Publicaciones y su autor! xd
      {posts
        ? posts.map((post, index) => (
            <div key={index}>
              {post.histories.map((history, index) => (
                <div key={index}>
                  <p>&quot;{history?.rawText}&quot;</p>
                  <p>{history?.generatedText}</p>
                  <Link
                    href={
                      history.author === "Anonymous" ? "" : `/user/${post._id}`
                    }
                  >
                    <p>{history.author}</p>
                  </Link>
                </div>
              ))}
            </div>
          ))
        : undefined}
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
