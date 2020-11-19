import styled from "styled-components";

const yellow = '#ffe05d'

export const SubmitButton = styled.button`
  background: #51ef63;
  color: #ffffff;
  font-size: 20px;
  font-weight: 600;
  text-transform: uppercase;
  padding: 12px 40px;
  border: none;
  border-radius: 10px;
  margin-top: 15px;
  float: right;
  cursor: pointer;
`
export const YellowButton = styled.button`
  background: ${yellow};
  text-transform: uppercase;
  color: #000000;
  border-radius: 4px;
  border: none;
  padding: 10px 30px;
  font-size: 20px;
  font-family: 'Gotham-Medium', sans-serif;
  text-decoration: none;
  cursor: pointer;
  :focus{
    outline: none;
  }
`

export const WhiteBorderButton = styled.button`
  background: none;
  text-transform: uppercase;
  color: #ffffff;
  border-radius: 4px;
  border: 2px solid #ffffff;
  padding: 8px 30px;
  font-size: 20px;
  font-family: 'Gotham-Medium', sans-serif;
  text-decoration: none;
  transition: all 0.5s ease-in;
  
  :focus{
    outline: none;
  }
  // :hover{
  //   color: #000000;
  //   border: 2px solid ${yellow};
  //   background: ${yellow};
  // }
`