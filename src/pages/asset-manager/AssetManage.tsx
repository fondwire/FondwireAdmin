import React from 'react';
import styled from 'styled-components'
import {Link} from 'react-router-dom';
import Footer from "../../components/footer/Footer";

const Wrapper = styled.div`
  padding: 0 8%;
  background: #ffffff;
  min-height: calc(100vh - 70px);
  
  &>.header{
    height: 90px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 25px;
    color: black;
    font-family: 'Gotham Book', sans-serif;
    &>div{
      &>.login{
        border: 2px solid black;
        border-radius: 33px;
        padding: 3px 30px;
      }
      &>a{
        color: black;
      }
    }
  }
  &>.body{
    display: flex;
    justify-content: space-between;
    &>.phoneWrapper{
    width: 300px;
    display: flex;
    align-items: center;

        &>img{
          width: 100%;
        }
    }
    &>.content{
      &>.description{
        width: 700px;
        font-size: 23px;
        font-family: 'Gotham Book', sans-serif;
      }
      &>.title{
        margin-top: 70px;
        font-size: 34px;
        display: flex;
        flex-direction: column;
        line-height: 50px;
        font-family: 'Gotham Book', sans-serif;
        
        &>strong{
          font-size: 36px;
          font-family: 'Gotham-Bold', sans-serif;
        }
      }
    }
  }
`

function AssetManage() {
    return (
        <>
            <Wrapper>
                <div className={'header'}>
                    <div>LOGO</div>
                    <div>
                        <Link className={'login'} to={'/sign-in'}>Login</Link>
                        <Link to={'/'}>Back Home</Link>
                    </div>
                </div>
                <div className={'body'}>
                    <div className={'content'}>
                        <div className={`title`}>
                            <span>fundWire App –</span>
                            <strong>Insights of the fund industy</strong>
                        </div>
                        <div className={'description'}>
                            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
                            nonumy eirmod tempor invidunt ut labore et dolore magna
                            aliquyam erat, sed diam voluptua. At vero eos et accusam et justo
                            duo dolores et ea rebum. Stet clita kasd gubergren,.
                        </div>
                        <div>Contact</div>
                    </div>
                    <div className={'phoneWrapper'}>
                        <img
                            src="https://cdn.tmobile.com/content/dam/t-mobile/en-p/cell-phones/apple/Apple-iPhone-12/Black/Apple-iPhone-12-Black-frontimage.png"
                            alt=""/>
                    </div>
                </div>
            </Wrapper>
            <Footer/>
        </>
    );
}

export default AssetManage;