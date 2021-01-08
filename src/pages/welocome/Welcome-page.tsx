import React, {useEffect, useRef, useState} from 'react';
// @ts-ignore
import {SectionsContainer, Section, Header, Footer} from 'react-fullpage';
import css from './welcome.module.css'
import {Link} from 'react-router-dom';
import Footer2 from '../../components/footer/Footer';

const WelcomePage = () => {
    let options = {
        sectionClassName:     'section',
        anchors:              ['sectionOne', 'sectionTwo', 'sectionThree', 'sectionFour'],
        scrollBar:            false,
        navigation:           false,
        verticalAlign:        false,
        arrowNavigation:      true,
        height:               '100%'
    };
    return (
        <>
            <Header>
                <div className={css.menu}>
                    <a href={"#sectionOne"}><div>LOGO</div></a>
                    <div className={css.nav}>
                        <a href={"#sectionTwo"}>How it works</a>
                        <a href={"#sectionThree"}>Support</a>
                        <a href={"#sectionFour"}>FAQ</a>
                        <Link to={'/asset-manager'} className={css.manager}>Asset Manager</Link>
                    </div>
                </div>
            </Header>
            <SectionsContainer className="container" {...options}>
                <Section>
                    <div id={'section1'} className={` ${css.section1}`}>
                        <div className={`${css.description}`}>
                            <div className={`${css.title}`}>
                                <span>fundWire App –</span>
                                <strong>Insights of the fund industy</strong>
                            </div>
                            <div className={`${css.des}`}>
                                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
                                nonumy eirmod tempor invidunt ut labore et dolore magna
                                aliquyam erat, sed diam voluptua. At vero eos et accusam et justo
                                duo dolores et ea rebum. Stet clita kasd gubergren,
                            </div>
                            <div className={css.downloadWrapper}>
                                <img src="https://miro.medium.com/max/8982/1*V9-OPWpauGEi-JMp05RC_A.png"
                                     alt="Download in AppStore"/>
                            </div>
                        </div>
                        <div className={css.phoneWrapper}>
                            <img src="https://cdn.tmobile.com/content/dam/t-mobile/en-p/cell-phones/apple/Apple-iPhone-12/Black/Apple-iPhone-12-Black-frontimage.png" alt=""/>
                        </div>
                    </div>
                </Section>
                <Section>
                    <div id={'section2'} className={`${css.section2}`}>
                        <div className={`${css.title} center`}>How it works</div>
                        <div className={`${css.steps}`}>
                            <div className={`${css.step}`}>
                                <img src="https://www.flaticon.com/svg/static/icons/svg/3039/3039520.svg" alt="#"/>
                                <span>Download the fundwire app</span>
                            </div>
                            <div className={`${css.step}`}>
                                <img src="https://www.flaticon.com/svg/static/icons/svg/3055/3055725.svg" alt="#"/>
                                <span>Follow favorit Asset Manager</span>
                            </div>
                            <div className={`${css.step}`}>
                                <img src="https://www.flaticon.com/svg/static/icons/svg/3502/3502601.svg" alt="#"/>
                                <span>Receive most relevant Insights</span>
                            </div>
                        </div>
                        <div className={`${css.apps}`}>
                            <div className={`${css.downloadWrapper}`}>
                                <img src="https://miro.medium.com/max/8982/1*V9-OPWpauGEi-JMp05RC_A.png"
                                     alt="Download in AppStore"/>
                            </div>
                            <div className={`${css.downloadWrapper}`}>
                                <img src="https://hybris.amway.dobroagency.ru/income-simulator/google-play.png"
                                     alt="Download in AppStore"/>
                                     <span className={css.soon}>- coming soon -</span>
                            </div>
                        </div>
                    </div>
                </Section>
                <Section>
                    <div id={'section3'} className={`${css.section3}`}>
                        <div>
                            <div className={`${css.title} left`}>Support</div>
                            <div className={`${css.des} ${css.titleDescription}`}>
                                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
                                nonumy eirmod tempor invidunt ut labore et dolore magna
                                aliquyam erat, sed diam voluptua. At vero eos et accusam et justo
                                duo dolores et ea rebum. Stet clita kasd gubergren.
                            </div>
                            <button className={`${css.contactBtn}`}>Open contact form</button>
                        </div>
                        <div className={css.phoneWrapper}>
                            <img src="https://cdn.tmobile.com/content/dam/t-mobile/en-p/cell-phones/apple/Apple-iPhone-12/Black/Apple-iPhone-12-Black-frontimage.png" alt=""/>
                        </div>
                    </div>
                </Section>
                <Section>
                    <div id={'section4'} className={`${css.section4}`}>
                        <div className={`${css.title} center`}>FAQ</div>
                        <div className={`${css.questionsWrapper}`}>
                            <List questions={'How do i download?'}
                                  answer={'You can download in app store or google play'} id={1} />
                            <List
                                questions={'Doet it cost anything?'}
                                answer={'The answer text. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod\n' +
                            'tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et\n' +
                            'accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,. '} id={1} />


                        </div>
                        <Footer>
                            <Footer2 />
                        </Footer>
                    </div>
                </Section>
            </SectionsContainer>
        </>
    )
}

function useOuterClick(callback: any) {
    const innerRef = useRef();
    const callbackRef = useRef();

    useEffect(() => {
        callbackRef.current = callback;
    });

    useEffect(() => {
        document.addEventListener("click", handleClick);
        return () => document.removeEventListener("click", handleClick);

        function handleClick(e: any) {
            // @ts-ignore
            if (innerRef.current && callbackRef.current && !innerRef.current.contains(e.target)) {
                // @ts-ignore
                callbackRef.current(e);
            }
        }
    }, []);

    return innerRef;
}

type ListProps = {
    questions: string
    answer: string
    id: number
}
const List: React.FC<ListProps> = (props) => {
    const [visible1, setVisible1] = useState(false)
    const innerRef = useOuterClick(() => {
        setVisible1(false)
    });
    // @ts-ignore
    return <div ref={innerRef} className={css.questionWrapper}>
            <div
                onClick={() => setVisible1(!visible1)}
                className={css.question}>
                <span className={css.questionTitle}>
                    <div>{props.questions}</div>
                    <img className={`${visible1 ? css.rotate : ''}`}
                         src="https://www.flaticon.com/svg/static/icons/svg/60/60995.svg" alt="\/"/>
                </span>
                <div className={visible1 ? css.animate : ''}>
                    {
                        visible1
                            ? <div className={css.answer}>
                                {props.answer}
                            </div>
                            : null
                    }
                </div>
            </div>
        </div>
}



export default WelcomePage;