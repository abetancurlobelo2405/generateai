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
export default function Generator({ user }) {
  const [loader, setLoader] = useState(false);
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  let [showBasicPlan, setShowBasicPlan] = useState(false);
  let [showMedium, setShowMedium] = useState(false);
  const [plans, setPlans] = useState("");
  const router = useRouter();

  const { PayPalHandler, ValueHandler, isPaid, value } =
    useContext(PayPalContext);

  async function onSubmit(event) {
    event.preventDefault();
    PayPalHandler(false);
    ValueHandler(0);
    setLoader(true);
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ input, isAnonymous: user ? false : true, plans }),
    });
    const data = await response.json();
    setResult(data.result);
    setLoader(false);
    setInput("");
  }

  useEffect(() => {
    if (isPaid) {
      if (value === 5) {
        setPlans("basic");
      }

      if (value === 10) {
        setPlans("intermediate");
      }
    }
  }, [value, isPaid]);

  return (
    <div>
      <Head>
        <title>OpenAI Quickstart</title>
      </Head>

      <main className={styles.main}>
        {user || router.query.anonymous === "true" ? (
          <>
            <Plans showModal={isPaid ? true : false}>
              <PayPalComponent
                total={5}
                description={"Plan basico de 3 dolarucos"}
                show={showBasicPlan}
              >
                <button
                  onClick={() =>
                    setShowBasicPlan((showBasicPlan = !showBasicPlan))
                  }
                >
                  Plan basico: 5 dolarucos
                </button>
              </PayPalComponent>
              <PayPalComponent
                total={10}
                description={"Plan medio de 10 dolarucos"}
                show={showMedium}
              >
                <button
                  onClick={() => setShowMedium((showMedium = !showMedium))}
                >
                  Plan basico: 10 dolarucos
                </button>
              </PayPalComponent>
            </Plans>

            <h3>Name my p`ppet</h3>

            <form onSubmit={onSubmit}>
              <textarea
                type="text"
                name="input"
                placeholder="Enter an input"
                maxLength={200}
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <input
                type="submit"
                disabled={isPaid ? false : true}
                value="Generate names"
              />
            </form>
            <div className={styles.endResult}>{result}</div>
            <span>{loader ? <p>CARGANDO....</p> : undefined}</span>
          </>
        ) : (
          <>
            <div className={styles.credentialsContainer}>
              <Link href={"/user/login"}>
                <div className={styles.login}>
                  ¡I want to login!
                  <img className={styles.imageLogin} src="/login-key.jpg"></img>
                </div>
              </Link>
              <Link
                href={{
                  pathname: "/user/generate",
                  query: { anonymous: true },
                }}
              >
                <div className={styles.anonymous}>
                  ¡I want to do it anonymously!
                  <span className={styles.anonymousInterrogation}>?</span>
                </div>
              </Link>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export async function getServerSideProps({ req, res }) {
  const user = await getSession({ req });

  return {
    props: { user },
  };
}
