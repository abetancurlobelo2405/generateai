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
import { Configuration, OpenAIApi } from "openai";
import { TypeAnimation } from "react-type-animation";
import Loader from "../../components/Loader";

// AGREGAR PDF DOWNLOADER LUEGO!!!
export default function Generator() {
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);
  const [textDone, setTextDone] = useState(false);
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [image, setImage] = useState([]);

  const { ConfirmationHandler, ValueHandler, isPaid, value } =
    useContext(PayPalContext);

  const configuration = new Configuration({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  });
  console.log(value);
  async function onSubmit(event) {
    event.preventDefault();
    ConfirmationHandler(false);
    ValueHandler("");
    setLoader(true);
    const response = await fetch("/api/generator", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ input, value }),
    });
    const data = await response.json();
    setResult(data.result);
    setImage(data.generatedImages);
    setLoader(false);
  }

  async function moderationHandler(event) {
    event.preventDefault();
    const openai = new OpenAIApi(configuration);
    const response = await openai.createModeration({
      input: input,
    });

    if (response.data.results[0].flagged === true) {
      setError(true);
      return;
    }
    setError(false);
    onSubmit(event);
  }

  return (
    <div>
      <Head>
        <title>OpenAI Quickstart</title>
      </Head>
      {textDone && (
        <div className={styles.advice}>
          ¡SUCCESSFULLY GENERATED!, IF YOU ARE LOGGED IN CHECK YOUR PROFILE OR
          CHECK THE PRINCIPAL PAGE
        </div>
      )}
      <div className={styles.maxContainer}>
        <div className={styles.exampleContainer}>
          <div className={styles.examples}>
            <div className={styles.boxExample}>
              <div className={styles.separator}>
                ¡THE LIMIT IS YOUR IMAGINATION!
              </div>
              <h2 className={styles.titleExample}>SOME EXAMPLES</h2>
              <div className={styles.item}>
                &quot;Create a long story about a witch with hypertension
                problems who is obsessed with soccer and does everything
                possible to surpass her idol Lionel Messi using magic.&quot;
              </div>
              <div className={styles.item}>
                &quot;Create a long story about a horse which wanted to dominate
                the world, so he obtained &quot;the apple of discord&quot;&quot;
              </div>
              <div className={styles.item}>
                &quot;Create a story about a talking bread who becomes a famous
                chef and starts a chain of artisanal bakery cafes, but their
                lack of hands makes it difficult for them to knead the
                dough.&quot;
              </div>
              <div className={styles.item}>
                &quot;Create a story about a yeti who becomes a world-famous
                yoga instructor and travels the globe teaching the art of
                mindfulness.&quot;
              </div>
              <div className={styles.item}>
                &quot;Create a story about a group of talking animals who open a
                theme park and become the most popular attraction in the
                world.&quot;
              </div>

              <div className={styles.separator}>
                you can also try develop a fictional continuation of a story
              </div>
              <div className={styles.premium}>
                <div className={styles.alert}>
                  THIS ONLY WORKS CORRECTLY WITH THE PREMIUM PLAN, WHICH USES A
                  MORE ADVANCED ARTIFICIAL INTELLIGENCE.
                </div>
                <div className={styles.item}>
                  &quot;Create a fictional continuation of Game Of
                  Thrones.&quot;
                </div>
                <div className={styles.item}>
                  &quot;Create a fictional end about Breaking Bad.&quot;
                </div>
                <div className={styles.item}>
                  &quot;Create a new fictional character for Harry Potter&quot;
                </div>
                <div className={styles.item}>
                  &quot;Create a fictional story about The Sopranos&quot;
                </div>
              </div>
            </div>
          </div>
        </div>
        <main className={styles.main}>
          <div className={styles.textGeneratedText}>
            {error ? (
              <div className={styles.textErrorContainer}>
                <p className={styles.textError}>
                  We have found inappropriate words in your text, please take a
                  look at your input and try again.
                </p>
              </div>
            ) : undefined}

            <form onSubmit={moderationHandler}>
              <div className={styles.inputContainer}>
                <div className={styles.textAreaContainer}>
                  <textarea
                    type="text"
                    name="input"
                    placeholder="Create a history about..."
                    maxLength={200}
                    minLength={10}
                    value={input}
                    className={error ? styles.textAreaError : styles.textArea}
                    onChange={(e) => setInput(e.target.value)}
                  />
                  <div className={styles.inputLength}>{input.length}/200</div>
                </div>
                <input
                  type="submit"
                  disabled={isPaid || value === 0 ? false : true}
                  className={
                    error ? styles.generateButtonError : styles.generateButton
                  }
                  value="¡GENERATE!"
                />
              </div>
            </form>

            <div className={styles.endResult}>
              {result ? (
                <TypeAnimation
                  sequence={[
                    1000,
                    result,
                    1000,
                    () => {
                      setTextDone(true);
                    },
                  ]}
                  wrapper="div"
                  cursor={false}
                  speed={99}
                  repeat={1}
                  style={{ fontSize: "1rem" }}
                />
              ) : loader ? (
                <div className={styles.loaderContainer}>
                  <div>
                    <Loader />
                  </div>
                  <span className={styles.generatingText}>Generating...</span>
                </div>
              ) : undefined}
            </div>
          </div>
          <div className={styles.images}>
            <div className={styles.generatedImageContainer}>
              {textDone &&
                image?.map((newImage, index) => (
                  <div key={newImage.url}>
                    <img
                      className={styles.individualGeneratedImage}
                      src={newImage.url}
                    ></img>
                  </div>
                ))}
            </div>
          </div>
        </main>
        <div></div>
      </div>
    </div>
  );
}
