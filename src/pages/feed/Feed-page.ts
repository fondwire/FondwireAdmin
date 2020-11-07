import styled from "styled-components";


export const FeedPageWrapper = styled.div`
  font-family: 'Gotham-Medium', sans-serif;
  &>.header{
    margin: 14px 0 40px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    &>div{
      display: flex;
      align-items: center;
    }
  }
  &>div>h3{
    font-size: 18px;
  }
`