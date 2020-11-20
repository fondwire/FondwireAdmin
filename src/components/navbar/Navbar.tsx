import React from 'react';
import {NavbarWrapper, NavList} from './navbar-style';
import {Link, NavLink} from 'react-router-dom';
import logo from '../../images/AdminLogo.png'

type NavbarProps = {
    isAdmin: boolean
}
const Navbar:React.FC<NavbarProps> = ({isAdmin,...props}) => {
    return (
        <NavbarWrapper>
            <Link to={`${!isAdmin ? '/dashboard' : '/users'}`} className={'logoWrapper'}>
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
                            <NavLink to={'/notifications'}>Notifications</NavLink>
                            <span >Logout</span>
                        </>
                }
            </NavList>
        </NavbarWrapper>
    );
}

export default Navbar;