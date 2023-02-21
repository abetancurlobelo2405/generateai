import React, { useEffect, useState } from "react";
import ModalWindow from "../../ModalWindow";
import {
  BackButton,
  Header,
  Image,
  Submit,
  Wrapper,
  OptionsContainer,
  Input,
  ImageContainer,
  ImageDescription,
  IndividualImage,
  GenerateButton,
  CoverContainer,
  CoverImage,
  CoverImageBlank,
  NextButton,
} from "./GeneratorCoverElements";
import { useRouter } from "next/router";

const GeneratorCover = (props) => {
  const { handleCoverPage, handlePreviewPage, input } = props;
  const [loader, setLoader] = useState(false);
  const [coverInput, setCoverInput] = useState({});
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    // If its "manualGeneration" target name we use coverInput, else we use the input prop.
    const response = await fetch("/api/generators/cover-generator", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        values:
          // We gather the values from coverInput or input.main(this is the value by the customer)
          e.target.name === "manualGeneration" ? coverInput.cover : input.main,
      }),
    });
    const data = await response.json();
    window.sessionStorage.setItem("images", JSON.stringify(data));
    setLoader(false);
  };

  const handleInput = (element) => {
    const { value } = element.target;
    setCoverInput({ ...coverInput, [element.target.name]: value });
  };

  return (
    <>
      <Header>LET&apos;S CREATE A COVER FOR YOU HISTORY</Header>
      <Wrapper>
        <p>Generated Images</p>
        <CoverContainer>
          {JSON.parse(window.sessionStorage?.getItem("images"))?.length > 0 ? (
            JSON.parse(window.sessionStorage.getItem("images")).map((image) => (
              <CoverImage
                onClick={() =>
                  window.sessionStorage.setItem("SelectedImage", image.url)
                }
                key={image.url}
                src={image.url}
              ></CoverImage>
            ))
          ) : (
            <>
              <CoverImageBlank>
                {loader ? <>Loading...</> : <>BLANK</>}
              </CoverImageBlank>
              <CoverImageBlank>
                {loader ? <>Loading...</> : <>BLANK</>}
              </CoverImageBlank>
              <CoverImageBlank>
                {loader ? <>Loading...</> : <>BLANK</>}
              </CoverImageBlank>
              <CoverImageBlank>
                {loader ? <>Loading...</> : <>BLANK</>}
              </CoverImageBlank>
            </>
          )}
        </CoverContainer>
        <OptionsContainer>
          <ModalWindow text={"WATCH SOME EXAMPLES"}>
            <ImageContainer>
              <IndividualImage>
                <Image src="/one/example1.png"></Image>
                <ImageDescription>
                  &quot;Digital art, a very detailed woman in a red dress
                  dancing at the styles of 1800&apos;s with a blurry
                  background&quot;
                </ImageDescription>
              </IndividualImage>
              <IndividualImage>
                <Image src="/one/example2.png"></Image>
                <ImageDescription>
                  &quot;A 3D render of an astronaut holding a rose, with blurry
                  galaxies in the background, creating a happy and uplifting
                  atmosphere&quot;
                </ImageDescription>
              </IndividualImage>
              <IndividualImage>
                <Image src="/one/example3.png"></Image>
                <ImageDescription>
                  &quot;Panda mad scientist mixing chemicals, digital art&quot;
                </ImageDescription>
              </IndividualImage>
              <IndividualImage>
                <Image src="/one/example4.png"></Image>
                <ImageDescription>
                  &quot;Digital art, portrait of a regal penguin wearing a
                  crown, set against a dark background.&quot;
                </ImageDescription>
              </IndividualImage>
              <IndividualImage>
                <Image src="/one/example5.png"></Image>
                <ImageDescription>
                  &quot;Cubist painting of a executioner with his axe holding a
                  beer.&quot;
                </ImageDescription>
              </IndividualImage>
              <IndividualImage>
                <Image src="/one/example6.png"></Image>
                <ImageDescription>
                  &quot;China town in a detailed cyberpunk style.&quot;
                </ImageDescription>
              </IndividualImage>
              <IndividualImage>
                <Image src="/one/example7.png"></Image>
                <ImageDescription>
                  &quot;An alien ridding a horse, digital art.&quot;
                </ImageDescription>
              </IndividualImage>
              <IndividualImage>
                <Image src="/one/example8.png"></Image>
                <ImageDescription>
                  &quot;A van Gogh style painting of an astronaut lost in
                  space.&quot;
                </ImageDescription>
              </IndividualImage>
              <IndividualImage>
                <Image src="/one/example9.png"></Image>
                <ImageDescription>
                  &quot;A beagle running, Kodak Ektar, 35mm f11, motion
                  blur.&quot;
                </ImageDescription>
              </IndividualImage>
            </ImageContainer>
          </ModalWindow>
          <Input
            maxLength={390}
            placeholder="Tell to the Artificial Intelligence how do you want your cover to be"
            name="cover"
            onChange={handleInput}
            type="text"
          ></Input>
          <Submit name="manualGeneration" onClick={(e) => onSubmit(e)}>
            GENERATE
          </Submit>
        </OptionsContainer>
        or...
        <div>
          <GenerateButton name="autoGeneration" onClick={(e) => onSubmit(e)}>
            Na, generate it for me!
          </GenerateButton>
        </div>
      </Wrapper>
      <BackButton onClick={() => handleCoverPage(false)}>BACK</BackButton>
    </>
  );
};

export default GeneratorCover;
