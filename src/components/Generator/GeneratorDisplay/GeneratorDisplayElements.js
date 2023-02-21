import styled, { keyframes } from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 2;
`;

export const ChaptersPanel = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export const ResultsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

export const ResultText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  height: 560px;
  margin: 5px;
  border: 1px solid #dddddd;
  border-radius: 6px;
  padding: 10px;
  box-shadow: 3px 3px 4px #dddddd;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    width: 12px;
    background-color: #f5f5f5;
  }

  /* Styles for the thumb (the part that the user drags) */
  ::-webkit-scrollbar-thumb {
    background-color: #b4b4b4;
    border-radius: 10px;
  }
`;

export const ResultSkeleton = styled.div`
  display: flex;
  justify-content: center;
  font-weight: 700;
  font-size: 20px;
  color: #b9b9b9;
  border: 1px solid #b9b9b9;
  border-radius: 6px;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const ResultImages = styled.div`
  display: flex;
  flex: 1;
  margin: 10px;
  flex-direction: column;
`;

export const Images = styled.img`
  margin: 3px;
  border-radius: 4px;
`;

export const RawImage = styled.button`
  width: 100%;
  height: 95%;
  border: 1px solid #dddddd;
  border-radius: 4px;
`;

export const ImageContainer = styled.div`
  position: relative;
  display: flex;
  height: 280px;
  width: 280px;
  flex: 1;
  cursor: pointer;
  align-items: flex-start;
  flex-direction: column;
`;

export const Delete = styled.button`
  position: absolute;
  left: 1;
  right: 0;
  bottom: 1;
  top: 0;
  outline: none;
  border: none;
  padding: 12px;
  margin-right: 20px;
  border-radius: 50%;
  width: 40px;
  font-weight: 700;
  background-color: #ffffff4a;
  color: #000000;
  cursor: pointer;

  &:hover {
    background-color: #ffffff33;
  }
`;

export const GenerationResult = styled.div`
  box-shadow: 3px 3px 4px #dddddd;
`;

export const Result = styled.div`
  display: flex;
  flex-direction: column;
  margin: 5px;
  white-space: pre-wrap;
  width: 400px;
`;

export const LoaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

export const LoaderText = styled.strong`
  font-size: 14px;
`;

export const Button = styled.button`
  cursor: pointer;
  border: none;
  outline: none;
  margin: 5px;
  flex: 1;
  height: 50px;
  border-radius: 4px;
  font-weight: 900;
  color: #cbf5ff;
  background-color: #4fbae6;
`;

const typing = keyframes`
  from { width: 0; }
  to { width: 100%; }
`;

export const TypeWriter = styled.span`
  overflow: hidden;
  border-right: 2px solid #000000;
  white-space: nowrap;
  animation: ${typing} 1s linear 1;
`;
