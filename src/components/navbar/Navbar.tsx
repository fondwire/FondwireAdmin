import React, {useContext} from 'react';
import {NavbarWrapper, NavList} from './navbar-style';
import {Link, NavLink} from 'react-router-dom';
import logo from '../../images/AdminLogo.png'
import {SIGN_IN_TYPE} from "../../state/RootReducer";
import {MyContext} from "../../App";
import Swal from "sweetalert2";

type NavbarProps = {
    isAdmin: boolean
    notificationLength?: any
}
const Navbar:React.FC<NavbarProps> = ({isAdmin, notificationLength}) => {
    const {dispatch} = useContext(MyContext)
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
                            <NavLink to={'/dashboard'}>Dashboard</NavLink>
                            <NavLink to={'/feed'}>Feed</NavLink>
                            <NavLink to={'/analytics'}>Analytics</NavLink>
                            <NavLink to={'/settings'}>Settings</NavLink>
                        </>
                        : <>
                            <NavLink to={'/users'}>Users</NavLink>
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
                                        localStorage.removeItem('userData')
                                        dispatch({
                                            type: SIGN_IN_TYPE,
                                            data: null
                                        })
                                    } else if (result.isDenied) {
                                        // Swal.fire('Changes are not saved', '', 'info')
                                    }
                                })

                            }}>Logout</span>
                        </>
                }
            </NavList>
        </NavbarWrapper>
    );
}

export default Navbar;