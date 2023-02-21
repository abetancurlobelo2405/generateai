import { getSession, useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import Head from "next/head";
import React, { useContext, useEffect, useState } from "react";
import styles from "../../styles/Generator.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import { Configuration, OpenAIApi } from "openai";
import GeneratorForm from "../../components/Generator/GeneratorForm";
import DisplayGeneratedText from "../../components/Generator/GeneratorDisplay";
import GeneratorCover from "../../components/Generator/GeneratorCover";
import GeneratedPreview from "../../components/Generator/GeneratedPreview";

// AGREGAR PDF DOWNLOADER LUEGO!!!
export default function GeneratorPage() {
  const [input, setInput] = useState({});
  const [loader, setLoader] = useState(false);
  const [currentGeneratedText, setCurrentGeneratedText] = useState("");
  const [chapter, setChapter] = useState(1);
  const [currentChapters, setCurrentChapters] = useState([]);
  const [imageLoader, setImageLoader] = useState(false);
  const [formDisabled, setFormDisabled] = useState(false);
  const [coverPage, setCoverPage] = useState(false);
  const [preview, setPreview] = useState(false);
  const [characters, setCharacters] = useState({});
  const router = useRouter();

  // **** Removes the sessionStorage when user leaves ****
  useEffect(() => {
    router.events.on("routeChangeComplete", handleUnload);
    return () => {
      router.events.off("routeChangeComplete", handleUnload);
    };
  }, [router.pathname]);
  useEffect(() => {
    window.addEventListener("beforeunload", handleUnload);
    return () => {
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, []);

  const handleUnload = () => {
    window.sessionStorage.removeItem("images");
    window.sessionStorage.removeItem("SelectedImage");
    window.sessionStorage.removeItem("userInput");
    window.sessionStorage.removeItem("data");
  };
  // **** Removes the sessionStorage when user leaves ****

  const configuration = new Configuration({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  });

  async function onSubmit(event) {
    event.preventDefault();
    setFormDisabled(true);
    setLoader(true);
    const response = await fetch("/api/generators/text-generator", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ input }),
    });
    const data = await response.json();
    setCurrentGeneratedText(data);
    setCurrentChapters([
      ...currentChapters,
      { text: data, title: `chapter ${chapter}` },
    ]);
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

  const imageGenerator = async (index) => {
    setImageLoader(true);
    const response = await fetch("/api/generators/image-generator", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: currentGeneratedText }),
    });
    const generatedImages = await response.json();

    const newArray = [...currentChapters];
    newArray[index - 1] = {
      ...newArray[index - 1],
      images: generatedImages,
    };
    setCurrentChapters(newArray);
    setImageLoader(false);
  };

  const nextChapter = async () => {
    if (chapter + 1 > currentChapters.length) {
      setLoader(true);
      const response = await fetch("/api/generators/next-chapter-generator", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ currentGeneratedText }),
      });
      const data = await response.json();
      setCurrentGeneratedText(data);
      setCurrentChapters([
        ...currentChapters,
        { text: data, title: `chapter ${chapter + 1}` },
      ]);
      setChapter(chapter + 1);
      setLoader(false);
    }
    setChapter(chapter + 1);
  };

  const previousChapter = async () => {
    setChapter(chapter - 1);
  };

  const deleteGeneratedImages = (image) => {
    const newArray = [...currentChapters];
    newArray[chapter - 1] = {
      ...newArray[chapter - 1],
      images: currentChapters[chapter - 1].images.filter(
        (generatedImg) => generatedImg.url !== image
      ),
    };
    setCurrentChapters(newArray);
    setImageLoader(false);
  };

  useEffect(() => {
    console.log(currentChapters);
  }, [currentChapters]);

  const handleCoverPage = (state) => {
    setCoverPage(state);
  };

  const handlePreviewPage = (state) => {
    setPreview(state);
  };

  return (
    <>
      {preview ? (
        <GeneratedPreview
          finalData={currentChapters}
          input={input}
          handlePreviewPage={handlePreviewPage}
        />
      ) : coverPage ? (
        <>
          <GeneratorCover
            input={input}
            handlePreviewPage={handlePreviewPage}
            handleCoverPage={handleCoverPage}
          />
        </>
      ) : (
        <div style={{ display: "flex", flexDirection: "row" }}>
          <GeneratorForm
            setInput={setInput}
            input={input}
            onSubmit={onSubmit}
            setCharacters={setCharacters}
            characters={characters}
            handleCoverPage={handleCoverPage}
            handlePreviewPage={handlePreviewPage}
            currentChapters={currentChapters}
            formDisabled={formDisabled}
            setFormDisabled={setFormDisabled}
          ></GeneratorForm>
          <DisplayGeneratedText
            currentChapters={currentChapters}
            setCurrentChapters={setCurrentChapters}
            chapter={chapter}
            deleteGeneratedImages={deleteGeneratedImages}
            imageGenerator={imageGenerator}
            nextChapter={nextChapter}
            previousChapter={previousChapter}
            imageLoader={imageLoader}
            loader={loader}
          ></DisplayGeneratedText>
        </div>
      )}
    </>
  );
}
