import React from "react";
import styles from "../styles/Legal.module.css";
import Link from "next/link";

const Faq = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.items}>
          <ul>
            <h2>Legal</h2>
            <div className={styles.itemContainer}>
              <li className={styles.item}>WHAT INFORMATION DO WE COLLECT?</li>
              We collect only the email and username that you provide to us
              using the Facebook Login, Github Login, or Google Login.
              <Link href="/privacy-policy">
                <span className={styles.info}>More information</span>
              </Link>
            </div>

            <div className={styles.itemContainer}>
              <li className={styles.item}>
                HOW DO WE PROCESS YOUR INFORMATION?
              </li>
              We process your information to provide, improve, and administer
              our Services, communicate with you, for security and fraud
              prevention, and to comply with law. We may also process your
              information for other purposes with your consent.
              <Link href="/privacy-policy">
                <span className={styles.info}>More information</span>
              </Link>
            </div>

            <div className={styles.itemContainer}>
              <li className={styles.item}>
                HOW DO WE HANDLE YOUR SOCIAL LOGINS?
              </li>
              If you choose to log in to our Services using a social media
              account, we reserve the right to obtain your email and username.
              <Link href="/privacy-policy">
                <span className={styles.info}>More information</span>
              </Link>
            </div>
            <div className={styles.itemContainer}>
              <li className={styles.item}>
                PRIVACY POLICY AND TERMS OF SERVICE LINKS:
              </li>
              <Link href="/privacy-policy">
                <span className={styles.info}>Privacy Policy</span>
              </Link>
              <br />
              <Link href="/terms-of-service">
                <span className={styles.info}>Terms of service</span>
              </Link>
            </div>
            <h2>Logistic</h2>
            <div className={styles.itemContainer}>
              <li className={styles.item}>CAN I GET REFUND?</li>
              Once the process of generation begins, it is not possible to
              refund the money due to the cost of processing of the artificial
              intelligence in generating the texts/images, therefore a refund is
              not possible once payment has been made.
            </div>
            <div className={styles.itemContainer}>
              <li className={styles.item}>CURRENTLY PAYMENT METHODS</li>
              We currently are only working with PayPal, in the future we may
              add more payment methods.
            </div>
            <div className={styles.itemContainer}>
              <li className={styles.item}>
                HOW LONG IT WILL TAKE TO GENERATE THE TEXT/IMAGES?
              </li>
              If you paid for the basic text plan (text-only generation), it
              will take around 3-7 seconds, if you paid for the intermediate
              plan (text and images generation), it will take around 6-12
              seconds approximately.
            </div>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Faq;
