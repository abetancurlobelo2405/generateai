import { useSession } from "next-auth/react";
import Head from "next/head";
import { useCallback, useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import { connectDB } from "../lib/mongoDBconnect";
import Link from "next/link";
import Profile from "../models/Profile";
import { TypeAnimation } from "react-type-animation";
import ModalPosts from "../components/ModalPosts";

const phrases = [
  "Generate a history about a dog",
  "Create a history about alchemy",
  "Create a history about revolution",
];
export default function Home({ posts }) {
  const [done, setDone] = useState(1);

  const [data, setData] = useState(null);

  return (
    <>
      <h1>XD - {data}</h1>
      <main className={styles.main}>
        <div className={styles.header}>
          <h1 className={styles.title}>
            ¡GENERATE{" "}
            <span className={styles.title2}>YOUR OWN AI HISTORIES</span> AND
            SHARE WITH THE COMMUNITY!
          </h1>
          <div className={styles.bannerContainers}>
            <div className={styles.banner1}>
              <div className={styles.bannerHeader}>
                <span>Your text: </span>
              </div>
              <div className={styles.rawTextContainer}>
                <span className={styles.rawText}>
                  <TypeAnimation
                    sequence={[
                      '"Create a story about a mad scientist"',
                      5500,
                      '"Make a story about a dragon named Ziploc who likes apples"',
                      5500,
                      '"Create a history about the end of the world"',
                      11500,
                    ]}
                    wrapper="div"
                    cursor={true}
                    speed={50}
                    repeat={Infinity}
                    style={{ fontSize: "1.5em", zIndex: "2" }}
                  />
                </span>
              </div>
            </div>

            <div className={styles.banner2}>
              <div className={styles.bannerHeader}>
                <span>Generated artificial intelligence text: </span>
              </div>
              {done === 1 ? (
                <TypeAnimation
                  sequence={[
                    3000,
                    "Once upon a time, there lived a mad scientist, Dr. Zangaddar. He was an eccentric, wild-eyed individual who lived in a ramshackle laboratory located in the mysterious woods. Dr. Zangaddar spent his days tinkering in his laboratory, coming up with all sorts of wild inventions. He dreamed of taking over the world one day, so every invention was designed with this goal in mind. His most impressive invention was a robotic army programmed to do his bidding. One fateful day, Dr. Zangaddar created a ray gun capable of controlling the minds of anyone it strikes. Armed with this new weapon, Dr. Zangaddar set off on his quest for global domination. He began to take over small villages and towns, one by one. Soon enough, the whole world was under his control.",
                    6500,
                    () => {
                      setDone(2); // Place optional callbacks anywhere in the array
                    },
                  ]}
                  wrapper="div"
                  cursor={false}
                  speed={99}
                  repeat={1}
                  style={{ fontSize: "1rem" }}
                />
              ) : undefined}
              {done === 2 ? (
                <TypeAnimation
                  sequence={[
                    "Once upon a time there lived a gentle giant named Ziploc. He was a majestic dragon in every way and a kind soul who dearly loved apples. Ziploc often made many journeys to nearby orchards, as apples were his favorite food. He was so fond of them, in fact, that he knew every farmer in the area and each of them welcomed him with open arms for a visit. The farmers often exchanged their apples with Ziploc for simple favors performed, such as helping them to clear their fields and lend protection from pesky thieves. Ziploc would happily oblige with a smile, before returning the the village with an armful of delicious apples.",
                    7500,
                    () => {
                      setDone(3);
                    },
                  ]}
                  wrapper="div"
                  cursor={false}
                  deletionSpeed={99}
                  speed={99}
                  repeat={1}
                  style={{ fontSize: "1rem" }}
                />
              ) : undefined}
              {done === 3 ? (
                <TypeAnimation
                  sequence={[
                    "In the Year 2090 the world faced its darkest days. Scientists around the world had predicted for years that climate change and pollution would eventually lead to disaster. The tipping point was reached when the temperature of the planet reached an unstable level. Atmospheric warming events occurred in a domino effect that rapidly spread across the planet resulting in extreme temperatures, rising sea levels, hurricanes, and droughts. Due to the rising sea levels, many countries were left uninhabitable and had to relocate their citizens to safe places around the world. The global economy reached a breaking point and governments had to make certain sacrifices in order to save their citizens. The extreme weather conditions became too much for the planet. Natural disasters occurred around the world, contributing to the end of the world. Crops failed, communities starved, and the human population dwindled.",
                    6500,
                    () => {
                      setDone(1);
                    },
                  ]}
                  wrapper="div"
                  cursor={false}
                  deletionSpeed={95}
                  speed={99}
                  repeat={1}
                  style={{ fontSize: "1rem" }}
                />
              ) : undefined}
            </div>
          </div>
        </div>

        <h1>Histories generated by the community!</h1>
        {posts
          ? posts.map((post, index) => (
              <div key={index} className={styles.mainContainer}>
                {post.histories.map((history, index) => (
                  <div key={index} className={styles.historyContainer}>
                    <span className={styles.author}>
                      <Link
                        href={
                          history.author === "Anonymous"
                            ? ""
                            : `/user/${post._id}`
                        }
                      >
                        {history.author}
                      </Link>
                    </span>
                    <p className={styles.userRawText}>
                      <span style={{ fontWeight: 650 }}>User:</span> &quot;
                      {history.rawText}&quot;
                    </p>
                    <div>
                      <hr className={styles.separator} />
                    </div>
                    <p className={styles.generatedText}>
                      <span style={{ fontWeight: 650 }}>
                        Generated text by AI:
                      </span>
                      {history.generatedText}
                    </p>
                    ...
                    <ModalPosts
                      author={history.author}
                      rawText={history.rawText}
                    >
                      {history.generatedText}
                    </ModalPosts>
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
