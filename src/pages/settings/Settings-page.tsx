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
import {useTranslation} from "react-i18next";

type SettingsPagePropsType = {
    user: UserType
}
const SettingsPage:React.FC<SettingsPagePropsType> = ({user}) => {
    const {dispatch} = useContext(MyContext)
    const {t} = useTranslation()
    return (
        <SettingsPageWrapper>
            <h3>{t("assetManagerHomeScreen.settings").toUpperCase()}</h3>
            <div>
                <SettingsBlock>
                    <div><img src={pen} alt="Pen"/> {t("assetManagerHomeScreen.me")}</div>
                    <div>{user && user.fullname ? `${user.fullname}` : 'Manager'}</div>
                </SettingsBlock>
                <SettingsBlock>
                    <div><img src={bell} alt="Bell"/> {t("assetManagerHomeScreen.notifications")}</div>
                    <div>All</div>
                </SettingsBlock>
                <SettingsBlock>
                    <div><img src={lock} alt="lock"/> {t("assetManagerHomeScreen.privacy")}</div>
                    <div>Only me</div>
                </SettingsBlock>
                <SettingsBlock>
                    <div className={'logout'} onClick={()=>{
                        Swal.fire({
                            // icon: 'error',
                            title: `<span style="font-family: 'Gotham-Medium', sans-serif;">Logout from your Account</span>`,
                            // text: 'Are you sure you want to log out ?',
                            html: `<div>
                                        <span style="font-family: 'Gotham-Medium', sans-serif">Are you sure you want to log out ?</span>
                                        <div class="modal-two-buttons-wrapper" style="margin: 20px 0;">
                                                            <button id="noGoBack" class="modal-submit">NO, GO BACK</button>
                                                            <button id="yesSave" class="modal-submit">YES, LOGOUT</button>
                                        </div>
                                    </div>`,
                            showDenyButton: false,
                            showConfirmButton: false,
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
                        const confirmBtn = document.getElementById("yesSave")
                        confirmBtn?.addEventListener('click', ()=> Swal.clickConfirm())
                        const deleteBtn = document.getElementById("noGoBack")
                        deleteBtn?.addEventListener('click', ()=> Swal.clickCancel())
                    }}>
                        {/*<img src={question} alt="?"/>*/}
                        {t("assetManagerHomeScreen.logoutLabel")}</div>
                    <div />
                </SettingsBlock>
            </div>
        </SettingsPageWrapper>
    );
}

export default SettingsPage;