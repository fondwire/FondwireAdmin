import styled from "styled-components";

export const SignInWrapper = styled.div`
  width: 220px;
  display: grid;
  margin: 0 auto;
  &>form{
    margin: 0 auto ;
    width: 180px;  
  }
  &>.title{
    text-align:center;
    color: white;
    font-size: 23px;
    font-weight: 500;
    font-family: 'Gotham-Medium', sans-serif;
    margin-bottom: 25px;
    &>div>span{
        text-decoration: none;
        margin: 0;
        line-height: 10px;
        font-size: 10px;
        color: white;
        text-align:center;
        font-family: 'Gotham Book', sans-serif;
    }
  }
  &>.forgot{
    text-decoration: none;
    margin-top: 10px;
    font-size: 10px;
    color: white;
    text-align:center;
    font-family: 'Gotham Book', sans-serif;
  }
`


export const SignWrapperStyle = styled.div`
  display: grid;
  width: 500px;
  margin: 0 auto;
  padding-top: 90px;
  .back{
    height: 30px;
    margin-bottom: 90px;
    &>img{
      height: 100%;
      filter: invert(100%) sepia(0%) saturate(7500%) hue-rotate(210deg) brightness(102%) contrast(102%);
    }
  }
 
`