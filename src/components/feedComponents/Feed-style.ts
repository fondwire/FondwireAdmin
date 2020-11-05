import styled from "styled-components";

export const FeedWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 160px 160px 110px 95px;
  background: #ffffff;
  padding: 0 5px;
  margin: 10px 0; 
  height: 40px;
  border-radius: 3px;
  
  &>div{
    margin: auto 0;
    text-align: left;
    font-weight: 600;
    font-family: 'Gotham-Bold', sans-serif;
    font-size: 15px;
    color: rgba(0,0,0,0.5);
  }
`

export const FeedComponentWrapper:any = styled(FeedWrapper)`
  &>div{
    font-weight: 400;
    font-family: 'Gotham-Medium', sans-serif;
    font-size: 13px;
  }
  &>.status>span{
    display: flex;
    width: 80px;
    justify-content: center;
    background: ${(props:any)=> props.bg};
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
  &>span{
    border-radius: 50%;
    width: 2px;
    height: 2px;
    background: #2f9dfb;
  }
`