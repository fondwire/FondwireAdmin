import React from 'react';
import styled from "styled-components";

const SettingsBlockWrapper = styled.div`
  background: #fff;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px;
  margin: 15px 0;
  
  &>:first-child{
    font-family: 'Gotham-Bold', sans-serif;
    font-size: 12px;
    height: 100%;
    display: flex;
    align-items: center;
    cursor: pointer;
    &>img{
      width: 12px;
      margin-right: 10px;
    }
  }
  &>:last-child{
    font-weight: 600;
    font-family: 'Gotham-Thin', sans-serif;
    font-size: 12px;
  }
`
type SettingsBlockProps = {

}
const SettingsBlock: React.FC<SettingsBlockProps> = (props) => {
    return (
        <SettingsBlockWrapper className={'blueColor'}>
            {props.children}
        </SettingsBlockWrapper>
    );
}

export default SettingsBlock;