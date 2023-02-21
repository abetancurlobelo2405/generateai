import styled from "styled-components";

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  height: 500px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: row-reverse;
  margin: 10px;
  font-weight: 700;
  font-size: 20px;
  align-items: center;
  justify-content: center;
`;

export const BackButton = styled.button`
  position: fixed;
  top: 50%;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
`;

export const NextButton = styled.button`
  display: flex;
  justify-content: center;
  cursor: pointer;
  align-items: center;
  outline: none;
  border: none;
  padding: 15px;
  position: absolute;
  top: 1;
  bottom: 1;
  left: 1;
  right: 0;
  height: 100%;
  background-color: #4fbae6;
  border-radius: 40px 0px 0px 40px;
  padding: 20px;
`;

export const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #757575;
  border-radius: 4px;
  margin: 5px;
`;

export const Input = styled.input`
  border: none;
  outline: none;
  width: 700px;
  height: 35px;
  font-size: 16px;
  border-radius: 4px;
  margin: 5px;
  color: #3a3b3a;
  border: 1px solid #f0f0f0;

  &:focus {
    border: 1px solid #757575;
  }
`;

export const ExampleImagesButton = styled.button`
  outline: none;
  border: none;
  height: 30px;
  border-radius: 4px;
  cursor: pointer;
  margin: 5px;
`;

export const IndividualImage = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const ImageDescription = styled.span`
  font-size: 18px;
  margin: 15px;
  color: #757575;
`;

export const ImageContainer = styled.div`
  display: grid;
  overflow-y: scroll;
  flex-direction: column;
  height: 100%;
  margin: 20px;
  justify-content: center;
  align-items: center;
`;

export const Image = styled.img`
  width: 250px;
  height: 250px;
  margin: 3px;
  border-radius: 4px;
`;

export const Select = styled.select`
  /* styles for the select element */
  font-size: 16px;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
  width: 500px;
  appearance: none;
  background-color: #ffffff;
`;

export const Option = styled.option`
  /* styles for the option elements */
  font-size: 16px;
  padding: 8px;
  background-color: #ffffff;
`;

export const GenerateButton = styled.button`
  cursor: pointer;
  outline: none;
  height: 30px;
  border-radius: 15px;
  border: none;
  padding: 5px;
  margin: 10px;
  font-weight: 700;
  background-color: #ffc107;
`;

export const Submit = styled.button`
  cursor: pointer;
  outline: none;
  border: none;
  height: 30px;
  font-weight: 700;
  border-radius: 0px 0px 4px 4px;
  background-color: #ffc107;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const CoverContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 50%;
  margin: 5px;
  height: 300px;
`;

export const CoverImage = styled.img`
  width: 200px;
  height: 100%;
  margin: 5px;
  border-radius: 4px;
`;

export const CoverImageBlank = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 100%;
  margin: 5px;
  color: #757575;
  border: 1px solid #757575;
  border-radius: 4px;
`;
