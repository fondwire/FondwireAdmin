import React from 'react';
import styled from 'styled-components'
import welcome from '../../images/welcome.png'
import logo from '../../images/AdminLogo.png'
import {YellowButton, WhiteBorderButton} from "../../components/Buttons/submit-button";
import { Link } from 'react-router-dom';

const WelcomeWrapper = styled.div`
  min-height: 100vh;
  padding: 15% 10% 0 10%;
  background-image: url(${welcome});
  background-size: 50%;
  background-repeat: no-repeat;
  background-position: right 100px top 50%;
  
  &>.logoWrapper{
    height: 160px;
    
    &>img{
      height: 100%;
    }
  }
  .description{
    margin: 35px 0;
    width: 200px;
    color: white;
    font-family: 'Gotham-Thin', sans-serif;
    font-size: 12px;
    line-height: 20px;
    letter-spacing: 1px;
  }
`

function WelcomePage() {
    return (
        <WelcomeWrapper>
            <div className={'logoWrapper'}>
                <img src={logo} alt="Fundwire"/>
            </div>
            <div className={'description'}>
                You can publish your articles,
                videos, events an podcast and more with Fundwire.
            </div>
            <div>
                <WhiteBorderButton as={Link} to={'/sign-in'}>Sign in</WhiteBorderButton>
                &nbsp;
                &nbsp;
                &nbsp;
                <YellowButton as={Link} to={'/sign-up'}>Sign up</YellowButton>
            </div>
        </WelcomeWrapper>
    );
}

export default WelcomePage;