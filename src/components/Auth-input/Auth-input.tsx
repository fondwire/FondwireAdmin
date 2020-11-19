import React from 'react';
import styled from "styled-components";


const AuthInputStyle = styled.label`
  font-size: 12px;
  color: white;
  &>input{
    border-radius: 2px;
    border: 2px solid #2f9dfb;
    width: 100%;
    height: 35px;
    padding: 0 0 0 5px;
    margin-bottom: 15px;
    
    :focus{
      outline: none;
    }
  }
  
  &>.title{
    font-family: 'Gotham Book', sans-serif;
    margin-bottom: 3px;
  }
`

type AuthInputProps = {
    title: string
    type: string
}
const AuthInput:React.FC<AuthInputProps> = ({title,type}) => {
    return (
        <AuthInputStyle>
            <div className={'title'}>{title}</div>
            <input type={type} className={'blueColor'} />
        </AuthInputStyle>
    );
}

export default AuthInput;