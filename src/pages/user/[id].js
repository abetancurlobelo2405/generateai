import React, { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import styles from "../../styles/Profile.module.css";
import ModalPosts from "../../components/ModalPosts";
import User from "../../models/User";

const UserProfile = ({ profile }) => {
  console.log(profile);
  return (
    <div className={styles.profile}>
      <p className={styles.profileUsername}>{profile?.username}</p>

      <div>
        {profile.posts &&
          profile.posts.map((history, index) => (
            <div key={index} className={styles.postText}>
              <>
                <p>&quot;{history.rawText}&quot;</p>
                <p>{history.generatedText}</p>
                <div className={styles.imagesContainer}>
                  {history.generatedImages.map((image) => (
                    <>
                      <img className={styles.individualImage} src={image}></img>
                    </>
                  ))}
                </div>
                <ModalPosts
                  author={history.author}
                  rawText={history.rawText}
                  images={history.generatedImages}
                >
                  {history.generatedText}
                </ModalPosts>
              </>
            </div>
          ))}
      </div>
    </div>
  );
};

export default UserProfile;

export async function getServerSideProps({ req, res, query: { id } }) {
  const currentUser = await getSession({ req });
  let user;

  if (id === "profile") {
    const userByEmail = JSON.stringify(
      await User.findOne({
        email: currentUser?.user?.email,
      }).populate("posts")
    );
    user = userByEmail;
  } else {
    const userById = JSON.stringify(await User.findById(id).populate("posts"));
    user = userById;
  }

  return {
    props: { profile: JSON.parse(user) },
  };
}
