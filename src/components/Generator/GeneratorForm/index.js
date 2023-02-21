import React, { useEffect, useMemo, useState } from "react";
import {
  Form,
  TextArea,
  Submit,
  Input,
  InputWrapper,
  Wrapper,
  TextDisplay,
  ImageDisplay,
  Display,
  GenerateCharacter,
  CharacterDescription,
  RemoveButton,
  Button,
  InputCreation,
  FormDisabled,
  FormOverlay,
  ButtonContainer,
  ToCover,
  PreviewContainer,
  Panel,
} from "./GeneratorFormElements";

const GeneratorForm = (props) => {
  const {
    setInput,
    input,
    onSubmit,
    handleCoverPage,
    formDisabled,
    handlePreviewPage,
    currentChapters,
  } = props;
  const [disableSubmit, setDisableSubmit] = useState(false);
  const [characterArray, setCharacterArray] = useState([]);
  const [location, setLocation] = useState(false);

  useEffect(() => {
    window.sessionStorage.setItem("userInput", JSON.stringify(input));
  }, [input]);

  const createCharacter = () => {
    setCharacterArray([...characterArray, { name: "", description: "" }]);
  };

  const deleteCharacter = (index) => {
    const newArray = [...characterArray];
    newArray.splice(index, 1);
    setCharacterArray(newArray);
  };

  const handleCharacterInput = (element, index) => {
    const { name, value } = element.target;
    const newArray = [...characterArray];
    newArray[index][name] = value;
    setCharacterArray(newArray);
  };

  const handleInputs = (element) => {
    const { value } = element.target;
    setInput({ ...input, [element.target.name]: value });
  };

  const addLocation = () => {
    setLocation(true);
  };

  const deleteLocation = () => {
    setLocation(false);
  };

  const handleDisabledSubmit = (result) => {
    setDisableSubmit(result);
  };

  useEffect(() => {
    console.log(input);
    setInput({ ...input, characterArray });
  }, [characterArray]);
  return (
    <Wrapper>
      {formDisabled ? (
        <Panel>
          <ToCover>
            <strong>¿Is your history ready?</strong>
            <Button onClick={() => handleCoverPage(true)}>
              LETS CREATE A COVER
            </Button>
          </ToCover>
          <PreviewContainer onClick={() => handlePreviewPage(true)}>
            {currentChapters.map((chapter) => (
              <>
                <p>{chapter.title}</p>
                <p>{chapter.text}</p>
              </>
            ))}
          </PreviewContainer>
        </Panel>
      ) : (
        <Form onSubmit={onSubmit}>
          <InputWrapper>
            <InputCreation
              formDisabled={formDisabled}
              type="button"
              onClick={createCharacter}
            >
              + CREATE CHARACTER
            </InputCreation>
            <InputCreation
              formDisabled={formDisabled}
              type="button"
              onClick={addLocation}
            >
              + ADD LOCATION
            </InputCreation>
          </InputWrapper>

          {characterArray.map((character, index) => (
            <>
              <InputWrapper>
                <Input
                  value={character.name}
                  formDisabled={formDisabled}
                  name="name"
                  placeholder="Character name"
                  onChange={(e) => handleCharacterInput(e, index)}
                  type="text"
                ></Input>
                <CharacterDescription
                  value={character.description}
                  formDisabled={formDisabled}
                  name="description"
                  placeholder="Character description"
                  onChange={(e) => handleCharacterInput(e, index)}
                  type="text"
                ></CharacterDescription>
                <RemoveButton
                  formDisabled={formDisabled}
                  type="button"
                  onClick={() => deleteCharacter(index)}
                >
                  REMOVE CHARACTER
                </RemoveButton>
              </InputWrapper>
            </>
          ))}

          {location ? (
            <>
              <InputWrapper>
                <Input
                  onChange={(e) => handleInputs(e)}
                  formDisabled={formDisabled}
                  placeholder="Example: Amazonas, United States, and Colombia."
                  name="location"
                  type="text"
                ></Input>
                <RemoveButton
                  formDisabled={formDisabled}
                  disableButton={disableSubmit}
                  type="button"
                  onClick={deleteLocation}
                >
                  REMOVE LOCATION
                </RemoveButton>
              </InputWrapper>
            </>
          ) : undefined}

          <InputWrapper>
            <TextArea
              type="text"
              name="main"
              placeholder="Main plot..."
              formDisabled={formDisabled}
              maxLength={200}
              minLength={10}
              onChange={(e) => handleInputs(e)}
            />
            <Submit
              onClick={() => handleDisabledSubmit(true)}
              disableButton={disableSubmit}
              type="submit"
            >
              GO!
            </Submit>
          </InputWrapper>
        </Form>
      )}
    </Wrapper>
  );
};

export default GeneratorForm;
