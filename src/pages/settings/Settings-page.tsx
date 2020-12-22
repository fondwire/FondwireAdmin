import React, {useContext} from 'react';
import { SettingsPageWrapper } from './settings-page-style';
import SettingsBlock from "../../components/settings-block/SettingsBlock";
// import question from '../../images/question.png'
import lock from '../../images/zamok.png'
import bell from '../../images/kolokolchik.png'
import pen from '../../images/pen.png'
import {Logout} from "../../firebase";
import {MyContext} from "../../App";
import {SIGN_IN_TYPE} from "../../state/RootReducer";
import {UserType} from "../../components/feedComponents/feed";
import Swal from "sweetalert2";

type SettingsPagePropsType = {
    user: UserType
}
const SettingsPage:React.FC<SettingsPagePropsType> = ({user}) => {
    const {dispatch} = useContext(MyContext)
    return (
        <SettingsPageWrapper>
            <h3>SETTINGS</h3>
            <div>
                <SettingsBlock>
                    <div><img src={pen} alt="Pen"/> Me</div>
                    <div>{user && user.fullname ? `${user.fullname}` : 'Manager'}</div>
                </SettingsBlock>
                <SettingsBlock>
                    <div><img src={bell} alt="Bell"/> Notifications</div>
                    <div>All</div>
                </SettingsBlock>
                <SettingsBlock>
                    <div><img src={lock} alt="lock"/> Privacy</div>
                    <div>Only me</div>
                </SettingsBlock>
                <SettingsBlock>
                    <div className={'logout'} onClick={()=>{
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
                        // Logout().then(()=>{
                        //     localStorage.removeItem('userData')
                        //     dispatch({
                        //         type: SIGN_IN_TYPE,
                        //         data: null
                        //     })
                        // })
                    }}>
                        {/*<img src={question} alt="?"/>*/}
                        Logout</div>
                    <div />
                </SettingsBlock>
            </div>
        </SettingsPageWrapper>
    );
}

export default SettingsPage;