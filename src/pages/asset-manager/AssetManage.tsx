import React, {useContext, useState} from 'react';
import styled from 'styled-components'
import {Link, useHistory} from 'react-router-dom';
import Footer from "../../components/footer/Footer";
import Swal from "sweetalert2";
import Modal from '../../components/modal/modal';
import * as Yup from "yup";
import {firestore} from "firebase";
import {Field, Form, Formik} from "formik";
import  {Input, TextArea} from "../../components/Auth-input/Auth-input";
import {db, signInFirebase} from "../../firebase";
import {SIGN_IN_TYPE} from "../../state/RootReducer";
import {MyContext} from "../../App";
import blackLogo from '../../images/darkLogo.png'

const Wrapper = styled.div`
  padding: 0 8%;
  background: #ffffff;
  min-height: calc(100vh - 70px);
  
  &>.header{
    height: 90px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 25px;
    color: black;
    font-family: 'Gotham Book', sans-serif;
    &>div{
      height: 90px;
      display: flex;
      align-items: center;
      &>img{
        height: 100%;
      }
      &>.login{
        cursor: pointer;
        border: 2px solid black;
        border-radius: 33px;
        padding: 3px 30px;
      }
      &>a{
        color: black;
        text-decoration: none;
        margin-left: 20px;
      }
    }
  }
  &>.body{
    display: flex;
    justify-content: space-between;
    &>.phoneWrapper{
    width: 300px;
    display: flex;
    align-items: center;

        &>img{
          width: 100%;
        }
    }
    &>.content{
      &>.description{
        margin-top: 20px;
        width: 700px;
        font-size: 23px;
        font-family: 'Gotham Book', sans-serif;
      }
      &>.title{
        margin-top: 70px;
        font-size: 34px;
        display: flex;
        flex-direction: column;
        line-height: 50px;
        font-family: 'Gotham Book', sans-serif;
        
        &>strong{
          font-size: 36px;
          font-family: 'Gotham-Bold', sans-serif;
        }
      }
      .contact{
        margin-top: 30px;
        display: inline-block;
        border: 2px solid #000000;
        padding: 10px 35px;
        font-size: 24px;
        font-family: 'Gotham-Bold', sans-serif;
        border-radius: 20px;
        cursor: pointer;
      }
    }
  }
`

const validateFormikSignUp = {
    email: Yup.string()
        .required('Required'),
    fullname: Yup.string()
        .required('Required'),
    companyName: Yup.string()
        .required('Required'),
}


const validateFormik = {
    email: Yup.string()
        .required('Required'),
    password: Yup.string()
        .required('Required')
        .min(6)
}

const initialValue = {
    email: '',
    password: ''
}
function AssetManage() {
    const {dispatch} = useContext(MyContext)
    const [visible, setVisible] = useState(false)
    const closeModal = () => {
        setVisible(false)
    }
    const [visibleLogin, setVisibleLogin] = useState(false)
    const closeLoginModal = () => {
        setVisibleLogin(false)
    }
    const history = useHistory()
    return (
        <>
            <Wrapper>
                <div className={'header'}>
                    <div><img src={blackLogo} alt="Fundwire"/></div>
                    <div>
                        <span onClick={()=>setVisibleLogin(true)} className={'login'}>Login</span>
                        <Link to={'/'}>Back Home</Link>
                    </div>
                </div>
                <div className={'body'}>
                    <div className={'content'}>
                        <div className={`title`}>
                            <span>fundWire App –</span>
                            <strong>Insights of the fund industy</strong>
                        </div>
                        <div className={'description'}>
                            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
                            nonumy eirmod tempor invidunt ut labore et dolore magna
                            aliquyam erat, sed diam voluptua. At vero eos et accusam et justo
                            duo dolores et ea rebum. Stet clita kasd gubergren,.
                        </div>
                        <div onClick={() => setVisible(true)} className={'contact'}>Contact</div>
                    </div>
                    <Modal visible={visibleLogin} width="500" height="450" effect="fadeInUp" onClickAway={closeLoginModal}>
                        <div className="modal-form-wrapper loginFormWrapper">
                            <div className={'modalTitle'}>LOGIN</div>
                            <br/>
                            <br/>
                            <div className={'description'}>
                                For Asset Managers and Admins only.
                                <br/>
                                App user's please login via the app
                            </div>
                            <Formik
                                initialValues={initialValue}
                                validationSchema={Yup.object().shape(validateFormik)}
                                onSubmit={(values)=>{
                                    signInFirebase(values.email, values.password)
                                        .then((res)=>{
                                            history.push('/')
                                            let user:any = res.user?.toJSON()
                                            let data: any = {
                                                isAdmin: false,
                                                ...res.user?.toJSON()
                                            }
                                            db.ref('/admins').once('value', function(snapshot){
                                                return snapshot.toJSON()
                                            }).then((d)=>{
                                                let admins = Object.values(d.toJSON() as string)
                                                admins.forEach((admin) => {
                                                    if(admin === user.uid){
                                                        data = {isAdmin: true, ...res.user?.toJSON()}
                                                    }
                                                })
                                                if(!data.isAdmin){
                                                    let ref = db.ref('/users')
                                                    ref.orderByChild("email").on("child_added", function(snapshot) {
                                                        // console.log(snapshot.key)
                                                        if(snapshot.val().email === data.email){
                                                            // console.log(snapshot.key + " : " + snapshot.val().email );
                                                            // console.log(snapshot.val().verified)
                                                            data = {
                                                                verified: snapshot.val().verified ? snapshot.val().verified : false,
                                                                id: snapshot.key,
                                                                ...data
                                                            }
                                                            localStorage.setItem('userData', JSON.stringify(data))
                                                            dispatch({
                                                                type: SIGN_IN_TYPE,
                                                                data: data
                                                            })
                                                        }
                                                    });
                                                }
                                                localStorage.setItem('userData', JSON.stringify(data))
                                                dispatch({
                                                    type: SIGN_IN_TYPE,
                                                    data: data
                                                })
                                            })
                                        }, (error) => {
                                            console.log(error.message)
                                            closeLoginModal()
                                            Swal.fire({
                                                icon: 'error',
                                                title: `<span style="font-family: 'Gotham-Medium', sans-serif;">Something went wrong.</span>`,
                                                html: `<span style="font-family: 'Gotham-Medium', sans-serif">${error?.message ? error.message : 'You can try later!'}</span>`,
                                            }).then((result)=>{
                                                if (result.isConfirmed) {
                                                    localStorage.removeItem('userData')
                                                    dispatch({
                                                        type: SIGN_IN_TYPE,
                                                        data: null
                                                    })
                                                }
                                            })
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
                                                <Field as={Input} errors={errors} touched={touched} placeholder={'Email'} type={'email'} name={'email'}/>
                                                <Field as={Input} errors={errors} touched={touched} placeholder={'Password'} type={'password'} name={'password'}/>
                                                <br/>
                                                <button type={'submit'} className={'modal-submit'}>Login</button>
                                            </Form>
                                        )
                                    }}
                            </Formik>
                        </div>
                    </Modal>
                    <Modal visible={visible} width="500" height="550" effect="fadeInUp" onClickAway={closeModal}>
                        <div className="modal-form-wrapper">
                            <div className="modalTitle">ASSET MANAGER REQUEST</div>
                            <br/>
                            <br/>
                            <Formik
                                initialValues={{
                                    email: '',
                                    fullname: '',
                                    companyName: '',
                                    phone: '',
                                    regarding: 'Regarding',
                                    message: ''
                                }}
                                validationSchema={Yup.object().shape(validateFormikSignUp)}
                                onSubmit={(values)=>{
                                    firestore().collection('mail').add(values).then(()=>{
                                        closeModal()
                                        Swal.fire({
                                            icon: 'success',
                                            title: `<div class="medium">Message sent.</div>`,
                                            html: ` <div class="save__wrapper"> Some message. </div>  `
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
                                                <Field as={Input} placeholder="YOUR NAME" errors={errors} touched={touched} title={'Full Name'} type={'text'} name={'fullname'}/>
                                                <Field as={Input} placeholder="EMAIL" errors={errors} touched={touched} title={'Email'} type={'email'} name={'email'}/>
                                                <Field as={Input} placeholder="COMPANY" errors={errors} touched={touched} title={'Company name'} type={'text'} name={'companyName'}/>
                                                <Field as={Input} placeholder="PHONE" errors={errors} touched={touched} title={'Phone'} type={'text'} name={'phone'}/>
                                                <select name="regarding" className={'modal-input'}>
                                                    <option value="Regarding">Regarding</option>
                                                    <option value="Business inquiry">Business inquiry</option>
                                                    <option value="Support request">Support request</option>
                                                    <option value="Complaint">Complaint</option>
                                                    <option value="Other">Other</option>
                                                </select>
                                                <Field as={TextArea} rows={5} style={{maxHeight: '100px'}} placeholder="MESSAGE" errors={errors} touched={touched} title={'Message'} name={'message'}/>
                                                <br/>
                                                <button className="modal-submit">Submit</button>
                                            </Form>
                                        )
                                    }}
                            </Formik>
                        </div>
                    </Modal>
                    <div className={'phoneWrapper'}>
                        <img
                            src="https://cdn.tmobile.com/content/dam/t-mobile/en-p/cell-phones/apple/Apple-iPhone-12/Black/Apple-iPhone-12-Black-frontimage.png"
                            alt=""/>
                    </div>
                </div>
            </Wrapper>
            <Footer/>
        </>
    );
}

export default AssetManage;