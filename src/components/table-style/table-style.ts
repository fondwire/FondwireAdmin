import styled from "styled-components";


export const TableStyle = styled.div`
  display: grid;
  grid-gap: 1em;
  background: #ffffff;
  padding: 0 5px;
  margin: 10px 0; 
  height: 40px;
  border-radius: 3px;
  
  &>div, a{
    text-decoration: none;
    margin: auto 0;
    text-align: left;
    font-weight: 600;
    font-family: 'Gotham-Bold', sans-serif;
    font-size: 15px;
    color: rgba(0,0,0,0.5);
  }
`