import styled from "styled-components";

export const CreatePageWrapper = styled.div`
    font-family: 'Gotham-Medium', sans-serif;
    
    &>div{
      display: flex;
      align-items: center;
      margin-bottom: 40px;
      &>div{
        height: 18px;
        margin-right: 10px;  
        
        &>img{
          height: 100%;
          cursor: pointer;
        }
      }
      &>h3{
        font-size: 18px;
      }
    }
`