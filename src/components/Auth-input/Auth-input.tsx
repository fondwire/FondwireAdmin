import React from 'react';
import styled from "styled-components";


const AuthInputStyle:any = styled.label`
  font-size: 12px;
  color: white;
  &>input{
    border-radius: 2px;
    border: ${(props:any) => !!props.error ? '2px solid red' : '2px solid #2f9dfb' } ;
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
    errors: any
    touched: any
    name: string
}
const AuthInput:React.FC<AuthInputProps> = (
        {title,type, errors, touched,name, ...props}
    ) => {
    return (
        <AuthInputStyle error={touched && touched[name] && errors && errors[name] && errors[name]}>
            <div className={'title'}>
                {touched && touched[name] && errors && errors[name]
                    ? <span className={'error'}>{errors[name]}</span>
                    : <span>{title}</span>}
            </div>
            <input type={type} className={'blueColor'} name={name} {...props} />
        </AuthInputStyle>
    );
}

export default AuthInput;

export const Input:React.FC<{
    type: string
    errors: any
    touched: any
    name: string
}> = ({type, errors, touched, name, ...props}) => {
        return <input
            type={type}
            className={`modal-input ${touched && touched[name] && errors && errors[name] && errors[name] && 'errorInput'}`}
            name={name} {...props} />
}

export const TextArea:React.FC<{
    errors: any
    touched: any
    name: string
}> = ({errors, touched, name, ...props}) => {
    return <textarea
        className={`modal-input modal-textarea ${touched && touched[name] && errors && errors[name] && errors[name]}`}
        name={name} {...props} />
}
