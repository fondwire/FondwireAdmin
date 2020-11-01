import React from 'react';
import {NavbarWrapper, NavList} from './navbar-style';
import {Link, NavLink} from 'react-router-dom';
import logo from '../../images/Adminlogo.png'

function Navbar() {
    return (
        <NavbarWrapper>
            <Link to={'/dashboard'} className={'logoWrapper'}>
                <div>
                    <img src={logo} alt="Fondwire"/>
                </div>
            </Link>
            <NavList>
                <NavLink to={'/dashboard'}>Dashboard</NavLink>
                <NavLink to={'/feed'}>Feed</NavLink>
                <NavLink to={'/analytics'}>Analytics</NavLink>
                <NavLink to={'/settings'}>Settings</NavLink>
            </NavList>
        </NavbarWrapper>
    );
}

export default Navbar;