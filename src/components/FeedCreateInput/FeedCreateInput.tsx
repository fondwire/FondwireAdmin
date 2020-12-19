import React from 'react';
import styled from 'styled-components'

const FeedInputWrapper = styled.label`
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 600;
  color: rgba(0,0,0,0.6);
  letter-spacing: 1px;
  
  &>input{
    margin: 4px 0 0 0;
    width: 100%;
    height: 38px;
    border-radius: 2px;
    border: 1px solid rgba(0,0,0,0.4);
    padding: 0 0 0 10px;
    :focus{
      outline: none;
    }
  }
`

type FeedCreateInputProps = {
    title: string
    status?: boolean
    value?: any
}
const FeedCreateInput:React.FC<FeedCreateInputProps> = ({title,status, ...props}) => {
    return (
        <FeedInputWrapper>
            <div className={ status !== undefined && !status ? 'error' : ''}>{title}</div>
            <input type="text" {...props} />
        </FeedInputWrapper>
    );
}
export default FeedCreateInput;


const FeedAddPrimpWrapper = styled.label`
  background: #121e34;
  color: #ffffff;
  display: flex;
  align-items: center;
  font-size: 12px;
  padding: 6px 5px ;
  text-transform: uppercase;
  &>input{
    margin-left: 5px;
  }
`
export const FeedAddPrimp:React.FC<FeedCreateInputProps> = ({title, ...props}) => {
    return (
        <FeedAddPrimpWrapper>
            <span>{title}</span>
            <input type="checkbox" {...props} checked={props?.value}/>
        </FeedAddPrimpWrapper>
    )
}