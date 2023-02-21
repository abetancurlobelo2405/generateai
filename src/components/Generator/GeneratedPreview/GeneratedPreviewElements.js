import styled from "styled-components";

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
  margin: auto;
`;

export const Cover = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  background-color: red;
`;

export const Author = styled.span`
  position: absolute;
  top: 1;
  bottom: 0;
  margin: 20px;
  background-color: #ffffff;
  padding: 5px;
  border-radius: 3px;
`;

export const Title = styled.input`
  display: flex;
  position: absolute;
  margin: 20px auto;
  border: none;
  outline: none;
  height: 40px;
  font-size: 20px;
  text-align: center;
  left: 0;
  right: 0;
  width: 90%;
  border-radius: 4px;
  box-shadow: 1px 1px 2px #000000;
`;

export const ChapterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 2px 2px 3px #dddddd;
  border: 1px solid #dddddd;
  padding: 15px;
  border-radius: 4px;
  margin-top: 10px;
`;

export const CoverImage = styled.img`
  width: 100%;
  object-fit: contain;
  background-color: blue;
`;

export const Footer = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  background-color: red;
  align-items: center;
  height: 80px;
`;

export const BackButton = styled.button`
  position: fixed;
  top: 50%;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
`;

export const FinishButton = styled.button`
  height: 50%;
`;
