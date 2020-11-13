import React from 'react';
import styled from 'styled-components'

const FeedInputWrapper = styled.label`
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 600;
  color: rgba(0,0,0,0.6);
  letter-spacing: 1px;
  
  &>input{
    margin: 4px 0 18px 0;
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
}
const FeedCreateInput:React.FC<FeedCreateInputProps> = ({title, ...props}) => {
    return (
        <FeedInputWrapper>
            <div>{title}</div>
            <input type="text" {...props} />
        </FeedInputWrapper>
    );
}

export default FeedCreateInput;