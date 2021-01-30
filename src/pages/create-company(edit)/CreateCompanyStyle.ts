import styled from 'styled-components'


export const CreateCompanyWrapper = styled.div`
   
  &>.title{
    font-family: 'Gotham-Bold', sans-serif;
    font-size: 18px;
    margin: 20px 0 50px;
  }
  & .uploader{
    display: flex;
    align-items: center;
    
    &>.buttons{
      margin-left: 15px;
      margin-top: -20px;
      color: rgba(0,0,0,0.6);
      text-decoration: underline;
    }
  }
  &>form .logoTitle{
    text-transform: uppercase;
    font-size: 12px;
    font-weight: 600;
    color: rgba(0,0,0,0.6);
  }
  input{
    margin: 2px 0 30px 0;
  }
`


export const LogoWrapper:any = styled.div`
  border-radius: ${(props:any) => props.circle ? '50%' : 0};
  margin: 2px 0 30px 0;
  width: 100px;
  height: 100px;
  background: #ffffff;
  display: flex;
  align-items: center;
  overflow: hidden;
  
  &>img{
    width: 100%;
    height: auto;
  }
`