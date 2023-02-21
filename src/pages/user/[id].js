import React, { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import styles from "../../styles/Profile.module.css";
import User from "../../models/User";

const handleSubscriptionPause = async (userData) => {
  const cancelSubscription = await fetch(
    `https://api-m.sandbox.paypal.com/v1/billing/subscriptions/${userData.plan.subscriptionDetails.subscriptionID}/suspend`,
    {
      method: "POST",
      headers: {
        Authorization: `Basic ${btoa(
          `${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}:${process.env.NEXT_PUBLIC_PAYPAL_SECRET}`
        )}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (cancelSubscription.ok) {
    alert("Cancelado!");
  }
};

const handleSubscriptionActivate = async (userData) => {
  const response = await fetch(
    `https://api-m.sandbox.paypal.com/v1/billing/subscriptions/${userData.plan.subscriptionDetails.subscriptionID}/activate`,
    {
      method: "POST",
      headers: {
        Authorization: `Basic ${btoa(
          `${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}:${process.env.NEXT_PUBLIC_PAYPAL_SECRET}`
        )}`,
        "Content-Type": "application/json",
      },
    }
  );
  console.log(response);
  if (response.ok) {
    alert("Subscripcion activada!");
  }
};

const UserProfile = ({ profile }) => {
  return (
    <div className={styles.profile}>
      <p className={styles.profileUsername}>{profile?.username}</p>
      <button onClick={() => handleSubscriptionPause(profile)}>
        CANCEL SUBSCRIPTION
      </button>
      <button onClick={() => handleSubscriptionActivate(profile)}>
        ACTIVATE SUBSCRIPTION
      </button>
      <div>
        {profile?.posts &&
          profile?.posts?.map((history, index) => (
            <div key={index} className={styles.postText}>
              <>
                <p>&quot;{history.rawText}&quot;</p>
                <p>{history?.generatedText}</p>
                <div className={styles.imagesContainer}>
                  {history?.generatedImages?.map((image) => (
                    <>
                      <img className={styles.individualImage} src={image}></img>
                    </>
                  ))}
                </div>
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
      })
    );
    user = userByEmail;
  } else {
    const userById = JSON.stringify(await User.findById(id));
    user = userById;
  }

  return {
    props: { profile: JSON.parse(user) },
  };
}
