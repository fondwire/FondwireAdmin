import styled from "styled-components";


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
  width: 100%;
  cursor: pointer;
  letter-spacing: 1px;
  
  &:disabled{
    background: #686868;
  }
`

