import React, { useEffect, useState } from "react";
import {
  Author,
  BackButton,
  ChapterContainer,
  Cover,
  CoverImage,
  FinishButton,
  Footer,
  MainContainer,
  Title,
  Wrapper,
} from "./GeneratedPreviewElements";
import { useSession } from "next-auth/react";

const GeneratedPreview = (props) => {
  const { handlePreviewPage, finalData } = props;
  const [cover, setCover] = useState("");
  const { data: session } = useSession();

  useEffect(() => {
    const selectImage = window.sessionStorage.getItem("SelectedImage");
    if (selectImage !== null) {
      setCover(selectImage);
    }
  }, []);

  const handleFinish = async () => {
    const userInput = JSON.parse(window.sessionStorage.getItem("userInput"));

    const response = await fetch("/api/post", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        cover,
        chapters: finalData,
        user: session.user.email,
        userInput,
      }),
    });
    console.log(response);
  };

  return (
    <>
      <BackButton onClick={() => handlePreviewPage(false)}>BACK</BackButton>
      <MainContainer>
        {cover ? (
          <>
            <Cover>
              <Title placeholder="A title for your history" type="text"></Title>
              <CoverImage src={cover}></CoverImage>
              <Author>Author: nombre de autor</Author>
            </Cover>
          </>
        ) : undefined}

        {finalData.map((chapter, index) => (
          <ChapterContainer key={index}>
            <h2>{chapter.title}</h2>
            <p>{chapter.text}</p>

            <p>
              {chapter.images ? (
                chapter.images.map((image) => (
                  <>
                    <img src={image.url}></img>
                  </>
                ))
              ) : (
                <p>Aqui iran las imagenes del capitulo en grisesito</p>
              )}
            </p>
          </ChapterContainer>
        ))}
      </MainContainer>
      <Footer>
        <FinishButton onClick={handleFinish}>
          ¿IS YOUR HISTORY READY?, ¡SHARE IT WITH THE COMMUNITY!
        </FinishButton>
      </Footer>
    </>
  );
};

export default GeneratedPreview;
