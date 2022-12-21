import React, { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import Profile from "../../models/Profile";

const UserProfile = ({ profile }) => {
  console.log(profile);
  return (
    <>
      <div>Profile</div>

      <div>
        <p>{profile.username}</p>
        {profile.histories.map((history, index) => (
          <div key={index}>
            <p>&quot;{history.rawText}&quot;</p>
            <p>{history.generatedText}</p>
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
