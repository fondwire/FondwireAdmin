import styled from "styled-components";

export const NavbarWrapper = styled.div`
  background: rgb(18,30,52);
  color: white;
  padding: 33px 33px;
  height: 100vh;
  position: sticky;
  top: 0;
  
  
  &>.logoWrapper>div{
    margin-top: 25px;
    width: 100%;
    height: 85px;
    &>img{
      height: 100%;
      
    }
  }
`

export const NavList = styled.div`
  display: grid;
  grid-gap: 1.5em;
  margin: 67px 0 0 15px;
  
  &>a{
    font-family: 'Gotham-Medium', sans-serif;
    color: white;
    text-decoration: none;
    font-size: 14px;
    line-height: 14px;
    text-transform: uppercase;
    font-weight: 500;
    letter-spacing: 1px;
    transition: all 0.25s linear;
  }
  &>.active{
      color: #43b9ea;
    }
`