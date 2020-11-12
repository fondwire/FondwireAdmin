import React from 'react'
import css from './preloader.module.css'
import favicon from '../../images/Logo .png'


const Preloader = () => {
    return (
        <div className={css.wrapper}>
            <div className={css.container}>
                <svg className={css.loader} viewBox="0 0 340 340">
                    <circle cx="170" cy="170" r="160" stroke="#00bdd0"/>
                    <circle cx="170" cy="170" r="135" stroke="#121e34"/>
                    <circle cx="170" cy="170" r="110" stroke="#00bdd0"/>
                    <circle cx="170" cy="170" r="85" stroke="#121e34"/>
                    {/*<circle cx="170" cy="170" r="60" stroke="#00bdd0"/>*/}
                </svg>
                <img className={css.img} src={favicon} alt="FONDWIRE"/>
            </div>
        </div>
    )
}


export default Preloader;
