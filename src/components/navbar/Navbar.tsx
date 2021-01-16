import React, {useContext} from 'react';
import {NavbarWrapper, NavList} from './navbar-style';
import {Link, NavLink} from 'react-router-dom';
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
                            <NavLink to={'/dashboard'}>{t("dashboard")}</NavLink>
                            <NavLink to={'/feed'}>{t("feed")}</NavLink>
                            <NavLink to={'/analytics'}>{t("analytics")}</NavLink>
                            <NavLink to={'/settings'}>{t("settings")}</NavLink>
                        </>
                        : <>
                            <NavLink to={'/managers'}>Managers</NavLink>
                            <NavLink to={'/companies'}>Companies</NavLink>
                            <NavLink to={'/notifications'}>
                                Notifications
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
                            <span className={'logout'} onClick={()=>{
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

                            }}>Logout</span>
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