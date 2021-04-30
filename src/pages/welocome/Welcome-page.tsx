import React, {useEffect, useRef, useState} from 'react';
// @ts-ignore
import {SectionsContainer, Section, Header, Footer} from 'react-fullpage';
import css from './welcome.module.css'
import {Link, useHistory} from 'react-router-dom';
import Footer2 from '../../components/footer/Footer';
import Swal from "sweetalert2";
import {Field, Form, Formik} from "formik";
import * as Yup from "yup";
import {firestore} from "firebase";
import {Input, TextArea} from "../../components/Auth-input/Auth-input";
import Modal from "../../components/modal/modal";
import yellowLogo from '../../images/yellowLogo.png'

const validateFormikSignUp = {
    email: Yup.string()
        .required('Required'),
    name: Yup.string()
        .required('Required'),
    phone: Yup.string()
        .required('Required'),
}

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
    const [visible, setVisible] = useState(false)
    const closeModal = () => {
        setVisible(false)
    }
    const history = useHistory()
    useEffect(()=>{
        history.push('')
    })
    return (
        <>
            <Header>
                <div className={css.menu}>
                    <a href={"#sectionOne"}><div><img src={yellowLogo} alt="Fundwire"/></div></a>
                    <div className={css.nav}>
                        <a href={"/#sectionTwo"}>How it works</a>
                        <a href={"/#sectionThree"}>Support</a>
                        <a href={"/#sectionFour"}>FAQ</a>
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
                            <button onClick={()=>setVisible(true)} className={`${css.contactBtn}`}>Open contact form</button>
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
            <Modal visible={visible} width="500" height="530" effect="fadeInUp" onClickAway={closeModal}>
                <div className="modal-form-wrapper">
                    <div className="modalTitle">SUPPORT REQUEST</div>
                    <br/>
                    <br/>
                    <Formik
                        initialValues={{
                            email: '',
                            name: '',
                            phone: '',
                            message: '',
                            use: 'no'
                        }}
                        validationSchema={Yup.object().shape(validateFormikSignUp)}
                        onSubmit={(values)=>{
                            // console.log(values)
                            // closeModal()
                            firestore().collection('support').add(values).then(()=>{
                                closeModal()
                                Swal.fire({
                                    icon: 'success',
                                    title: `<div class="medium">Message sent.</div>`,
                                    html: ` <div class="save__wrapper"> Thank you for messaging. </div>  `
                                }).then(()=>{
                                    history.push('/')
                                })
                            }, (error)=>{
                                closeModal()
                                Swal.fire({
                                    icon: 'error',
                                    title: '<div class="medium">Something wend wrong, try later.</div>',
                                    html: ` <div class="save__wrapper"> ${error} </div>  `
                                }).then(()=>{})
                            })
                        }}
                    >
                        {
                            ({
                                 touched,
                                 errors,
                             }) => {
                                return (
                                    <Form>
                                        <Field as={Input} placeholder="YOUR NAME" errors={errors} touched={touched} title={'Full Name'} type={'text'} name={'name'}/>
                                        <Field as={Input} placeholder="EMAIL" errors={errors} touched={touched} title={'Email'} type={'email'} name={'email'}/>
                                        <Field as={Input} placeholder="PHONE" errors={errors} touched={touched} title={'phone'} type={'text'} name={'phone'}/>
                                        <div className="use-app">
                                            <span>Do you use our app already? if yes, which?</span>
                                            <select name={'use'}>
                                                <option value="no">No</option>
                                                <option value="IOS">IOS</option>
                                                <option value="android">Android</option>
                                            </select>
                                        </div>
                                        <Field as={TextArea} rows={5} style={{maxHeight: '100px'}} placeholder="MESSAGE" errors={errors} touched={touched} title={'Message'} name={'message'}/>
                                        <br/>
                                        <button type={'submit'} className="modal-submit">Submit</button>
                                    </Form>
                                )
                            }}
                    </Formik>
                </div>
            </Modal>
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