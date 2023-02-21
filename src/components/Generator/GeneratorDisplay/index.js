import React, { useEffect, useState } from "react";
import { TypeAnimation } from "react-type-animation";
import ImageLoaderComponent from "../../ImageLoaderComponent";
import TextLoaderComponent from "../../TextLoaderComponent";
import {
  Button,
  ChaptersPanel,
  Delete,
  ImageContainer,
  Images,
  LoaderContainer,
  LoaderText,
  RawImage,
  ResultImages,
  ResultSkeleton,
  ResultsWrapper,
  ResultText,
  TypeWriter,
} from "./GeneratorDisplayElements";

const DisplayGeneratedText = (props) => {
  const {
    currentChapters,
    setCurrentChapters,
    chapter,
    deleteGeneratedImages,
    imageGenerator,
    previousChapter,
    nextChapter,
    imageLoader,
    loader,
  } = props;

  const [editTitle, setEditTitle] = useState(false);

  const handleTitleInput = (event) => {
    console.log(event.target.value);
    const newArray = [...currentChapters];
    newArray[chapter - 1] = {
      ...newArray[chapter - 1],
      title: event.target.value,
    };
    setCurrentChapters(newArray);
  };

  const handleTitleEdit = (state) => {
    setEditTitle(state);
  };

  return (
    <>
      {!loader ? (
        <>
          <>
            <ResultsWrapper>
              <ResultText>
                {currentChapters.length > 0 ? (
                  <>
                    <button onClick={handleTitleEdit}>Edit</button>
                    {editTitle ? (
                      <>
                        <input
                          onChange={handleTitleInput}
                          value={
                            currentChapters[chapter - 1].hasOwnProperty("title")
                              ? currentChapters[chapter - 1].title
                              : `Chapter ${chapter}`
                          }
                          name="title"
                          type="text"
                          placeholder="Edit chapter's title"
                        ></input>
                        <button
                          onClick={() => handleTitleEdit(false)}
                          type="submit"
                        >
                          OK!
                        </button>
                        <button
                          onClick={() => handleTitleEdit(false)}
                          type="button"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <h1>{currentChapters[chapter - 1].title}</h1>
                      </>
                    )}
                    <div style={{ whiteSpace: "pre-wrap" }}>
                      {currentChapters[chapter - 1]?.text}
                    </div>
                  </>
                ) : (
                  <ResultSkeleton>¡TEXT WILL BE GENERATED HERE!</ResultSkeleton>
                )}
              </ResultText>

              <ResultImages>
                {currentChapters[chapter - 1]?.images ? (
                  <>
                    {currentChapters[chapter - 1].images.map((image) => (
                      <>
                        <ImageContainer>
                          <Images src={image.url}></Images>
                          <Delete
                            onClick={() => deleteGeneratedImages(image.url)}
                          >
                            X
                          </Delete>
                        </ImageContainer>
                      </>
                    ))}
                  </>
                ) : currentChapters.length > 0 ? (
                  <>
                    <ImageContainer>
                      {!imageLoader ? (
                        <RawImage onClick={() => imageGenerator(chapter)}>
                          GENERATE IMAGE
                        </RawImage>
                      ) : (
                        <LoaderContainer>
                          <ImageLoaderComponent />
                          <LoaderText>GENERATING IMAGE</LoaderText>
                        </LoaderContainer>
                      )}
                    </ImageContainer>
                    <ImageContainer>
                      {!imageLoader ? (
                        <RawImage onClick={() => imageGenerator(chapter)}>
                          GENERATE IMAGE
                        </RawImage>
                      ) : (
                        <LoaderContainer>
                          <ImageLoaderComponent />
                          <LoaderText>GENERATING IMAGE</LoaderText>
                        </LoaderContainer>
                      )}
                    </ImageContainer>
                  </>
                ) : undefined}
              </ResultImages>
            </ResultsWrapper>
          </>
        </>
      ) : (
        <LoaderContainer>
          <TextLoaderComponent />
          <LoaderText>GENERATING TEXT</LoaderText>
        </LoaderContainer>
      )}

      <ChaptersPanel>
        {chapter > 1 ? (
          <Button onClick={previousChapter}>PREVIOUS CHAPTER</Button>
        ) : undefined}
        {currentChapters.length > 0 ? (
          <Button onClick={nextChapter}>
            {chapter + 1 > currentChapters.length ? (
              <>GENERATE NEXT CHAPTER</>
            ) : (
              <>NEXT CHAPTER</>
            )}
          </Button>
        ) : undefined}
      </ChaptersPanel>
    </>
  );
};

export default DisplayGeneratedText;
