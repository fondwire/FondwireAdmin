import React from 'react'
import css from './preloader.module.css'
import favicon from '../../images/darkLogo.png'


const Preloader = () => {
    return (
            <div className={css.container}>
                <svg className={css.loader} viewBox="0 0 340 340">
                    <circle cx="170" cy="170" r="160" stroke="#feff04"/>
                    <circle cx="170" cy="170" r="135" stroke="#1c1c1c"/>
                    <circle cx="170" cy="170" r="110" stroke="#feff04"/>
                    <circle cx="170" cy="170" r="85" stroke="#1c1c1c"/>
                    {/*<circle cx="170" cy="170" r="60" stroke="#00bdd0"/>*/}
                </svg>
                <img className={css.img} src={favicon} alt="FONDWIRE"/>
            </div>
    )
}


export default Preloader;
