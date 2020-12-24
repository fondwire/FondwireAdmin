import styled from "styled-components";

export const CreatePageWrapper = styled.div`
    font-family: 'Gotham-Medium', sans-serif;
    & .input-file{
      display: none;
    }
    & .btn__wrapper{
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-gap: 1em;
      
      & button:disabled{
        background: grey;
        cursor: not-allowed;
      }
    }
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