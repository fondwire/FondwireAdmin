import React, {useContext} from 'react';
import styled from 'styled-components'
import logo from '../../images/AdminLogo.png'
import Preloader from "../../utils/preloader/preloader";
import {MyContext} from "../../App";
import Swal from "sweetalert2";
import {Logout} from "../../firebase";
import {SIGN_IN_TYPE} from "../../state/RootReducer";

const Wrapper = styled.div`
  height: 100%;
  padding: 0 8%;
  font-family: 'Gotham Book', sans-serif;
  &>.header{
    padding: 40px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 20px;
    font-weight: 600;
    
    &>.logout{
      cursor:pointer;
    }
  }
  & .logo__wrapper{
    height: 60px;
    
  }
    
  &>.section{
    text-align:center;
    margin-top: 80px;
    color: white;
    
    &>.image__wrapper{
      height: 150px;
      & img{
        height: 45px !important;
      }
    }
    &>.title{
      font-size: 22px;
      letter-spacing: 1px;
      font-weight: 600;
      font-family: 'Gotham-Medium', sans-serif;
      margin: 80px 0 25px 0;
    }
    &>.description{
      width: 300px;
      text-align: center;
      margin: 0 auto;
      font-size: 15px;
      font-family: 'Gotham Book', sans-serif;
    }
  }
  & img{
      height: 100%;
      //filter: invert(98%) sepia(11%) saturate(2%) hue-rotate(114deg) brightness(114%) contrast(100%);
  }
`
const Unverified:React.FC = () => {
    const {dispatch} = useContext(MyContext)
    return (
        <Wrapper>
            <div className={'header'}>
                <div className={'logo__wrapper'}><img src={logo} alt="Fundwire"/></div>
                <div onClick={()=>{
                    Swal.fire({
                        icon: 'error',
                        title: `<span style="font-family: 'Gotham-Medium', sans-serif;">Logout from your Account</span>`,
                        // text: 'Are you sure you want to log out ?',
                        html: `<span style="font-family: 'Gotham-Medium', sans-serif">Are you sure you want to log out ?</span>`,
                        showDenyButton: true,
                        denyButtonText: 'No',
                        showConfirmButton: true,
                        confirmButtonText: 'Yes',
                        // confirmButtonColor: 'green',
                        focusConfirm: false,
                    }).then((result)=>{
                        if (result.isConfirmed) {
                            Logout().then(()=>{
                                localStorage.removeItem('userData')
                                dispatch({
                                    type: SIGN_IN_TYPE,
                                    data: null
                                })
                            })
                        } else if (result.isDenied) {
                            // Swal.fire('Changes are not saved', '', 'info')
                        }
                    })
                }} className={'logout'}> LOGOUT </div>
            </div>
            <div className={'section'}>
                <div className={'image__wrapper'}>
                    <Preloader />
                </div>
                <div className={'title'}>PENDING</div>
                <div className={'description'}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure, similique.</div>
            </div>
        </Wrapper>
    );
}

export default Unverified;