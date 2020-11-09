import React from 'react';
import styled from "styled-components";

const Wrapper = styled.div`
  position:relative;
  display: flex;
  
  &>input{
    border: 1px solid #2e9dfb;
    border-radius: 8px;
    font-weight: 400;
    font-size: 11px;
    font-family: 'Gotham-Medium', sans-serif;
    color: #2e9dfb;
    width: 250px;
    margin-right: 25px;
    padding: 9px 10px;
    ::placeholder,
    ::-webkit-input-placeholder {
       color: #2e9dfb;
    }
    :focus{
      outline: none;
    }
  }
`

function SearchInput() {
    return (
        <Wrapper>
            <input type="text" placeholder={'Search'}/>
        </Wrapper>
    );
}

export default SearchInput;