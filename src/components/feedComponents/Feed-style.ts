import styled from "styled-components";
import { TableStyle } from "../table-style/table-style";

export const FeedWrapper = styled(TableStyle)`
  grid-template-columns: 1fr 80px 140px 140px 110px 95px;
`

export const TableComponentWrapper = (props:any) => `
 &>div, a{
    font-weight: 400;
    font-family: 'Gotham-Medium', sans-serif;
    font-size: 13px;
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
`

export const FeedComponentWrapper:any = styled(FeedWrapper)`
  ${(props:any)=>TableComponentWrapper(props.bg)}
`

export const ActionWrapper = styled.div`
  border-radius: 50%;
  background: rgba(47,157, 251, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 5px;
  width: 22px;
  height: 22px;
  cursor: pointer;
  position:relative;
  
  &>span{
    border-radius: 50%;
    width: 2px;
    height: 2px;
    background: #2f9dfb;
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
    visibility: ${(props:any) => props.opacity ? 'visible' : 'hidden'};
    opacity: ${(props:any) => props.opacity};
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
    //cursor: pointer;
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
  }
`