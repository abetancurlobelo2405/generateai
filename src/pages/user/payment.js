import { getSession, useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useContext, useEffect, useState } from "react";
import PayPalComponent from "../../components/PaypalComponent";
import styles from "../../styles/Generator.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import Plans from "../../components/Plans";
import PayPalContext, { PayPalProvider } from "../../context/PayPalContext";

// AGREGAR PDF DOWNLOADER LUEGO!!!

export default function Payment({ user }) {
  let [showFirst, setShowFirst] = useState(false);
  let [showSecond, setShowSecond] = useState(false);
  let [showThird, setShowThird] = useState(false);
  let [showFourth, setShowFourth] = useState(false);
  const router = useRouter();

  const { isPaid, ValueHandler } = useContext(PayPalContext);

  const freeTextHandler = () => {
    ValueHandler(0);
  };

  useEffect(() => {
    if (isPaid) {
      router.push("/user/generator");
    }
  }, [isPaid]);

  return (
    <>
      <div className={styles.mainPayment}>
        {user || router.query.anonymous === "true" ? (
          <div className={styles.paymentsContainer}>
            <div className={styles.container}>
              <div className={styles.price}>FREE</div>
              <Link href="/user/generator">
                <button className={styles.paymentOne} onClick={freeTextHandler}>
                  <p className={styles.freePlan}>FREE PLAN</p>
                  <div className={styles.basicPlanText}>
                    !Generate text with a BASIC artificial intelligence and
                    share it with the community!
                  </div>
                  <img className={styles.image} src="/txt-only.svg"></img>
                </button>
              </Link>
            </div>
            <div className={styles.container}>
              <div className={styles.price}>$1.25</div>
              <PayPalComponent
                total={0.99}
                description={"Text and images"}
                show={showFourth}
              >
                <button
                  className={styles.paymentTwo}
                  onClick={() => setShowFourth((showFirst = !showFirst))}
                >
                  <p className={styles.premiumPlan}>PREMIUM PLAN</p>
                  <div className={styles.textImages}>
                    ¡Generate a text and 4 images related to your text with a
                    POWERFUL artificial intelligence!
                  </div>
                  <img className={styles.image} src="/txt-img.svg"></img>
                </button>
              </PayPalComponent>
            </div>
          </div>
        ) : (
          <div className={styles.credentialsContainer}>
            <Link href={"/user/login"}>
              <div className={styles.login}>
                ¡I want to login!
                <img className={styles.imageLogin} src="/login-key.jpg"></img>
              </div>
            </Link>
            <Link
              href={{
                pathname: "/user/payment",
                query: { anonymous: true },
              }}
            >
              <div className={styles.anonymous}>
                ¡I want to do it anonymously!
                <span className={styles.anonymousInterrogation}>?</span>
              </div>
            </Link>
          </div>
        )}
      </div>
    </>
  );
}

export async function getServerSideProps({ req, res }) {
  const user = await getSession({ req });

  return {
    props: { user },
  };
}
