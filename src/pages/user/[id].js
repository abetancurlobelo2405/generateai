import React, { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import Profile from "../../models/Profile";
import styles from "../../styles/Profile.module.css";
import ModalPosts from "../../components/ModalPosts";

const UserProfile = ({ profile }) => {
  return (
    <>
      <div>Profile</div>

      <p>{profile.username}</p>

      <div className={styles.posts}>
        {profile.histories.map((history, index) => (
          <div key={index} className={styles.postText}>
            <>
              <p>&quot;{history.rawText}&quot;</p>
              <p>{history.generatedText}</p>
              <ModalPosts author={history.author} rawText={history.rawText}>
                {history.generatedText}
              </ModalPosts>
            </>
          </div>
        ))}
      </div>
    </>
  );
};

export default UserProfile;

export async function getServerSideProps({ req, res, query: { id } }) {
  const currentUser = await getSession({ req });
  let user;
  if (id === "profile") {
    const userByEmail = JSON.stringify(
      await Profile.findOne({
        email: currentUser?.user?.email,
      })
    );
    user = userByEmail;
  } else {
    const userById = JSON.stringify(await Profile.findById(id));
    user = userById;
  }

  return {
    props: { profile: JSON.parse(user) },
  };
}
