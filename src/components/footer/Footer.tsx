import React from 'react';
import styled from 'styled-components'

const Wrapper = styled.div`
  height: 70px;
  line-height: 70px;
  background: rgb(28,28,28);
  color: #ffffff;
  font-size: 22px;
  font-family: 'Gothom-Medium', sans-serif;
  text-align:center;
`

function Footer() {
    return (
        <Wrapper>
            ©2020 All Rights Reserved
        </Wrapper>
    );
}

export default Footer;