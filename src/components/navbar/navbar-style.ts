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
  
  &>a,span{
    font-family: 'Gotham-Medium', sans-serif;
    color: white;
    text-decoration: none;
    font-size: 14px;
    line-height: 14px;
    text-transform: uppercase;
    font-weight: 500;
    letter-spacing: 1px;
    transition: all 0.25s linear;
    cursor: pointer;
    position:relative;
    
    &>.notification{
       position: absolute;
       right: 0;
       top: -5px;
       color: #121E34;
       background: #f0db65;
       border-radius: 50%;
       width: 20px;
       height: 20px;
       text-align:center;
       line-height: 20px;
       font-size: 12px;
    }
    &>.plus{
      font-size: 8px;
    }
  }
  &>.active{
      color: #43b9ea;
    }
`