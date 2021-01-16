import React, {useEffect, useState} from "react";
// import "./language.css";
import { useTranslation } from "react-i18next";
import germany from '../../images/germany.png'
import usa from '../../images/usa.png'
import css from './language.module.css'
function Language() {
    const { i18n } = useTranslation();
    const [click, setClick] = useState(false)
    // const [lang, setLang] = useState("ru");
    const lng = localStorage.getItem('i18nextLng')
    useEffect(()=>{
        const kg:any = document.getElementById("kg"); // de
        const rus:any = document.getElementById("rus"); // en

        if (lng === 'de') {
            kg.style.backgroundColor = "#feff04";
            kg.style.color = "#fff";
            kg.disabled = true;
            kg.style.transition = "1s";
            kg.style.transitionTimingFunction = "ease";
            kg.style.boxShadow = "0px 0px 20px rgba(50, 180, 130, 0.25)";

            rus.style.backgroundColor = "#CCCCCC";
            rus.style.color = "#000";
            rus.disabled = false;
            rus.style.transition = "1s";
            rus.style.transitionTimingFunction = "ease";
            rus.style.boxShadow = "none";

            setClick(false);
        }

        if (lng === 'en') {
            rus.style.backgroundColor = "#feff04";
            rus.disabled = true;
            rus.style.transition = "1s";
            rus.style.transitionTimingFunction = "ease";
            rus.style.boxShadow = "0px 0px 20px rgba(50, 180, 130, 0.25)";

            kg.style.backgroundColor = '#CCCCCC';
            kg.style.color = "#000";
            kg.disabled = false;
            kg.style.transition = "1s";
            kg.style.transitionTimingFunction = "ease";
            kg.style.boxShadow = "none";

            setClick(true);
        }
    }, [lng])
    const changeLang = (lang:any) => {
        setClick(true)
        i18n.changeLanguage(lang);

        const kg:any = document.getElementById("kg"); //de
        const rus:any = document.getElementById("rus"); //en

        if (click) {
            kg.style.backgroundColor = "#fff";
            kg.disabled = true;
            kg.style.transition = "1s";
            kg.style.transitionTimingFunction = "ease";
            // kg.style.boxShadow = "0px 0px 20px rgba(50, 180, 130, 0.25)";

            rus.style.backgroundColor = "rgba(0,0,0,0)";
            rus.style.color = "#000";
            rus.disabled = false;
            rus.style.transition = "1s";
            rus.style.transitionTimingFunction = "ease";
            rus.style.boxShadow = "none";

            setClick(false);
        }

        if (!click) {
            rus.style.backgroundColor = "#fff";
            // rus.style.color = "#fff";
            rus.disabled = true;
            rus.style.transition = "1s";
            rus.style.transitionTimingFunction = "ease";
            // rus.style.boxShadow = "0px 0px 20px rgba(50, 180, 130, 0.25)";

            kg.style.backgroundColor = 'rgba(0,0,0,0)'
            kg.disabled = false;
            kg.style.transition = "1s";
            kg.style.transitionTimingFunction = "ease";
            kg.style.boxShadow = "none";

            setClick(true);
        }
    };

    return (
        <div className={css.language}>
            <div className={css.lg_change} id="rus" onClick={() => changeLang("en")}>
                {/*<img src="https://www.flaticon.com/svg/static/icons/svg/206/206626.svg" alt="EN"/>*/}
                <img src={usa} alt="EN"/>
            </div>
            <div className={css.lg_change} id="kg" onClick={() => changeLang("de")}>
                <img src={germany} alt="DE"/>
            </div>
        </div>
    );
}

export default Language;