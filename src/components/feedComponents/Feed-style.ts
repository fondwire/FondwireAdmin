import styled from "styled-components";
import {TableStyle} from "../table-style/table-style";

export const FeedWrapper = styled(TableStyle)`
  grid-template-columns: 1fr 180px 180px  160px 20px;
`

export const TableComponentWrapper = (props: any) => `
 &>.title{
    color: #171616d1;
    font-weight: 600;
    font-family: 'Gotham-Bold', sans-serif;    
    padding-right: 30px;
 }
 &>div, a{
    font-weight: 600;
    font-family: 'Gotham Book', sans-serif;
    font-size: 11px;
    &>.user__image{
      width: 30px;
      height: 30px;
      background: #fbe163;
      padding: 5px;
      border-radius: 50%;
      &>img{
        width: 100%;
        height: 100%;
      }
    }
  }
  &>.status>span{
    display: flex;
    width: 80px;
    justify-content: center;
    background: ${props};
    border-radius: 10px;
    font-size: 10px;
    padding: 4px 0;
    color: white;
  }
  &>:first-child{
    padding-right: 15px;
    white-space: nowrap; /* Запрещаем перенос строк */
    overflow: hidden;
    text-overflow: ellipsis;
  }
  &>:last-child{
    display: flex;
    justify-content: center;
  }
  &:hover  div>.action__wrapper {
     opacity: 1;
     visibility: visible;
  }
  
`

export const FeedComponentWrapper: any = styled(FeedWrapper)`
  ${(props: any) => TableComponentWrapper(props.bg)}
  
  &:hover + div>.action__wrapper {
    //color: red !important;
     opacity: 1;
     visibility: visible;
  }
`

export const ActionWrapper = styled.div`
  border-radius: 50%;
  //background: rgba(47,157, 251, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding: 0 5px;
  width: 22px;
  height: 22px;
  cursor: pointer;
  position:relative;
  
  &>span{
    border-radius: 50%;
    width: 3px;
    height: 3px;
    background: #000;
  }
`

export const FeedModal:any = styled.span`
    cursor:default;
    color: white;
    min-width: 80px;
    padding: 10px 20px;
    position: absolute;
    background: #121e34;
    bottom: 11px;
    z-index: 3;
    right: 70%;
    visibility: ${(props: any) => props.opacity ? 'visible' : 'hidden'};
    opacity: ${(props: any) => props.opacity};
    transition: visibility 0s , opacity 0.5s linear;
    
    &>div{
      font-family: 'Gotham-Medium', sans-serif;
      font-size: 10px;
      margin: 10px 0;
      cursor: pointer;
    }
      
    &>.delete{
      color: red;
    }
`

export const CreateNewWrapper = styled.div`
  font-weight: 600;
  letter-spacing: 1px;
  font-size: 18px;
  display: flex;
  align-items: center;
  .plus{
    cursor: pointer;
    text-decoration:none;
    margin-left: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'Gotham-Thin', sans-serif;
    font-size: 25px;
    color: #2f9dfb;
    background:#ffffff;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    position: relative; 
    &:hover > .modal{
      opacity: 1;
      visibility: visible;
    }
    .modal{
      cursor: auto;
      text-transform: uppercase;
      transition: all 0.6s linear;
      position: absolute;
      top: 20px;
      right: 20px;
      padding: 20px 35px;
      background: #121e34;
      font-size: 14px;
      z-index: 15;
      opacity: 0;
      visibility: hidden;
      
      &>div{
        margin: 10px  0;
        
        &>a{
          text-decoration: none;
          color: white;
          font-family: 'Gotham Book', sans-serif;
          
          :hover{
            color: #2f9dfb;
          }
        }
      }
  }
  }
`