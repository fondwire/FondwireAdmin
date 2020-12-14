import React, {useContext} from 'react';
import {NavbarWrapper, NavList} from './navbar-style';
import {Link, NavLink} from 'react-router-dom';
import logo from '../../images/AdminLogo.png'
import {SIGN_IN_TYPE} from "../../state/RootReducer";
import {MyContext} from "../../App";

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
                                localStorage.removeItem('userData')
                                dispatch({
                                    type: SIGN_IN_TYPE,
                                    data: null
                                })
                            }}>Logout</span>
                        </>
                }
            </NavList>
        </NavbarWrapper>
    );
}

export default Navbar;