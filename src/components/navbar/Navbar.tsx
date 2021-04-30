import React, {useContext} from 'react';
import {NavbarWrapper, NavList} from './navbar-style';
import {Link, NavLink, useHistory} from 'react-router-dom';
import logo from '../../images/yellowLogo.png'
import {SIGN_IN_TYPE} from "../../state/RootReducer";
import {MyContext} from "../../App";
import Swal from "sweetalert2";
import {Logout} from "../../firebase";
import Language from "../language/language";
import {useTranslation} from "react-i18next";

type NavbarProps = {
    isAdmin: boolean
    notificationLength?: any
}
const Navbar:React.FC<NavbarProps> = ({isAdmin, notificationLength}) => {
    const {dispatch} = useContext(MyContext)
    const {t} = useTranslation();
    const length = notificationLength.length
    const onLogoutModal = ()=>{
        Swal.fire({
            // icon: 'error',
            title: `<span style="font-family: 'Gotham-Medium', sans-serif;">${t("assetManagerHomeScreen.logoutFromAcc")}</span>`,
            // text: 'Are you sure you want to log out ?',
            html: `<div>
                                        <span style="font-family: 'Gotham-Medium', sans-serif">${t("assetManagerHomeScreen.areYouSure")}</span>
                                        <div class="modal-two-buttons-wrapper" style="margin: 20px 0;">
                                                            <button id="noGoBack" class="modal-submit">${t("assetManagerHomeScreen.noGoBack").toUpperCase()}</button>
                                                            <button id="yesSave" class="modal-submit">${t("assetManagerHomeScreen.yesLogout").toUpperCase()}</button>
                                        </div>
                                    </div>`,
            showDenyButton: false,
            showConfirmButton: false,
            // confirmButtonColor: 'green',
            focusConfirm: false,
        }).then((result)=>{
            if (result.isConfirmed) {
                Logout().then(()=>{
                    window.location.reload()
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
        const confirmBtn = document.getElementById("yesSave")
        confirmBtn?.addEventListener('click', ()=> Swal.clickConfirm())
        const deleteBtn = document.getElementById("noGoBack")
        deleteBtn?.addEventListener('click', ()=> Swal.clickCancel())
    }
    return (
        <NavbarWrapper>
            <Link to={`${isAdmin ? '/dashboard' : '/users'}`} className={'logoWrapper'}>
                <div>
                    <img src={logo} alt="Fundwire"/>
                </div>
            </Link>
            <NavList>
                {
                    !isAdmin ? <>
                            <NavLink to={'/dashboard'}>{t("assetManagerHomeScreen.dashboardLabel")}</NavLink>
                            <NavLink to={'/feed'}>{t("assetManagerHomeScreen.feedLabel")}</NavLink>
                            <NavLink to={'/analytics'}>{t("assetManagerHomeScreen.analyticsLabel")}</NavLink>
                            <NavLink to={'/settings'}>{t("assetManagerHomeScreen.settingsLabel")}</NavLink>
                            <span className={'logout'} onClick={onLogoutModal}>{t("assetManagerHomeScreen.logoutLabel")}</span>
                        </>
                        : <>
                            <NavLink to={'/managers'}>{t("assetManagerHomeScreen.managers")}</NavLink>
                            <NavLink to={'/companies'}>{t("assetManagerHomeScreen.companies")}</NavLink>
                            <NavLink to={'/content'}>{t("assetManagerHomeScreen.feedLabel")}</NavLink>
                            <NavLink to={'/users'}>{t("assetManagerHomeScreen.appUsers")}</NavLink>
                            <NavLink to={'/notifications'}>
                                {t("assetManagerHomeScreen.notifications")}
                                {
                                    length ?
                                        <span className={
                                            length && length > 99
                                                ? ' notification plus'
                                                : ' notification '
                                        }>
                                    {length && length > 99 ? '+99' : length}
                                </span>
                                        : null
                                }
                            </NavLink>
                            <span className={'logout'} onClick={onLogoutModal}>{t("assetManagerHomeScreen.logoutLabel")}</span>
                        </>
                }
            </NavList>
            <span className={'language'}>
                <Language />
            </span>
        </NavbarWrapper>
    );
}

export default Navbar;