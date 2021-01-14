import styled from 'styled-components'

export const AnalyticsWrapper = styled.div`
  display: flex;
  //flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  
  //&>div:first-child{
  //  margin-right: 50px;
  //  width: 80%;
  //}
  //&>div:last-child{
  //  margin-left: 50px;
  //}
  &>div{
    width: 100%;  
    display: flex;
    align-items: center;
    background: white;
    min-height: 185px;
  }
`

export const ContentWrapper = styled.div`
  flex-direction: column;
  justify-content: space-between;
  padding: 23px 0 12px 0;
  text-transform: uppercase;
  
  &>.chart__content{
    display: flex;
    width: 100%;
    justify-content: space-around;
  }
  &>.functions{
    opacity: 0.65;
    font-size: 10.5px;
    
    &>div>div:first-child{
      margin-bottom: 7px;
    }
  }
  &>.content__info{
    font-size: 40px;
    font-weight: 600;
    color: #43b9ea;
    font-family: 'Gotham-Thin',sans-serif;
  }
`