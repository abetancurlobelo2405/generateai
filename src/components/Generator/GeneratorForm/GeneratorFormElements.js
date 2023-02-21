import React from "react";
import styled, { css, keyframes } from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  align-items: baseline;
  max-height: 600px;
  width: 100%;
  flex: 1;
`;

export const Form = styled.form`
  display: flex;
  width: 500px;
  padding: 5px;
  margin: 5px;
  overflow-y: auto;
  justify-content: center;
  flex-direction: column;
  box-shadow: 3px 3px 4px #dddddd;
  border: 1px solid #dddddd;
  border-radius: 6px;
  position: relative;
`;

export const ToCover = styled.div`
  display: flex;
  width: 500px;
  padding: 5px;
  margin: 5px;
  overflow-y: auto;
  justify-content: center;
  flex-direction: column;
  box-shadow: 3px 3px 4px #dddddd;
  border: 1px solid #dddddd;
  border-radius: 6px;
  position: relative;
`;

export const PreviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 470px;
  margin: 5px;
  box-shadow: 3px 3px 4px #dddddd;
  border: 1px solid #dddddd;
  border-radius: 6px;
  overflow-y: auto;

  &:hover {
    background-color: #dddddd;
    cursor: pointer;
  }
`;

export const Panel = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Input = styled.input`
  outline: none;
  border: none;
  text-align: center;
  border-radius: 4px 4px 0px 0px;
  box-shadow: 3px 3px 4px #dddddd;
  border: 1px solid #dddddd;
  height: 25px;

  ${({ formDisabled }) =>
    formDisabled &&
    css`
      position: relative;
      pointer-events: none;
    `}
`;

export const ButtonContainer = styled.div`
  display: flex;
  margin-top: 10px;
  flex-direction: column;
  align-items: center;
  position: absolute;
  width: 100%;
  height: 100%;
`;

export const Button = styled.div`
  cursor: pointer;
  padding: 15px;
  font-weight: 600;
  background-color: #ffc107;
  border-radius: 5px;
`;

export const Submit = styled.button`
  outline: none;
  border: none;
  height: 30px;
  background-color: #4fbae6;
  border-radius: 0px 0px 5px 5px;
  color: #cbf5ff;
  font-weight: 700;
  font-size: 17px;
  cursor: pointer;
  box-shadow: 3px 3px 4px #dddddd;

  ${({ disableButton }) =>
    disableButton &&
    css`
      pointer-events: none;
      background-color: #dddddd;
      color: #999999;
    `}
`;

export const InputCreation = styled.button`
  outline: none;
  border: none;
  height: 30px;
  color: #4fbae6;
  margin: 4px;
  background-color: #ffffff;
  border: 1px solid #4fbae6;
  font-weight: 700;
  cursor: pointer;
  border-radius: 4px;

  ${({ formDisabled }) =>
    formDisabled &&
    css`
      position: relative;
      pointer-events: none;
    `}
`;

export const TextArea = styled.textarea`
  outline: none;
  border: none;
  height: 100px;
  box-shadow: 3px 3px 4px #dddddd;
  border: 1px solid #dddddd;
  resize: none;

  ${({ formDisabled }) =>
    formDisabled &&
    css`
      position: relative;
      pointer-events: none;
    `}
`;

const removeInputAnimation = keyframes`
  from { transform: translateX(-100%); }
  to { transform: translateX(0%); }
`;

export const RemoveButton = styled.button`
  outline: none;
  border: none;
  border-radius: 0px 0px 4px 4px;
  box-shadow: 3px 3px 4px #dddddd;
  border: 1px solid #dddddd;
  cursor: pointer;
  font-weight: 700;
  height: 20px;
  color: #999999;
  animation: ${removeInputAnimation} 0.2s linear;

  ${({ formDisabled }) =>
    formDisabled &&
    css`
      position: relative;
      pointer-events: none;
    `}
`;

export const CharacterDescription = styled(TextArea)`
  height: 60px;

  ${({ formDisabled }) =>
    formDisabled &&
    css`
      position: relative;
      pointer-events: none;
    `}
`;

const inputAnimation = keyframes`
  from { transform: translateY(-100%); }
  to { transform: translateY(0%); }
`;

export const InputWrapper = styled.div`
  display: flex;
  margin: 6px;
  flex-direction: column;
  animation: ${inputAnimation} 0.5s ease-out;
`;
