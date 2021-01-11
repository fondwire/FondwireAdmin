import React, {useState} from 'react';
import styled from 'styled-components'
import {Link, useHistory} from 'react-router-dom';
import Footer from "../../components/footer/Footer";
import Swal from "sweetalert2";
import Modal from '../../components/modal/modal';
import * as Yup from "yup";
import {firestore} from "firebase";
import {Field, Form, Formik} from "formik";
import {Input, TextArea} from "../../components/Auth-input/Auth-input";

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
      &>.login{
        border: 2px solid black;
        border-radius: 33px;
        padding: 3px 30px;
      }
      &>a{
        color: black;
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
function AssetManage() {
    const [visible, setVisible] = useState(false)
    const closeModal = () => {
        setVisible(false)
    }
    const history = useHistory()
    return (
        <>
            <Wrapper>
                <div className={'header'}>
                    <div>LOGO</div>
                    <div>
                        <Link className={'login'} to={'/sign-in'}>Login</Link>
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
                    <Modal visible={visible} width="500" height="500" effect="fadeInUp" onClickAway={closeModal}>
                        <div className="modal-form-wrapper">
                            <div className="modalTitle">ASSET MANAGER REQUEST</div>
                            <br/>
                            <br/>
                            <Formik
                                initialValues={{
                                    email: '',
                                    fullname: '',
                                    companyName: '',
                                    position: '',
                                    phone: '',
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
                                                <Field as={TextArea} rows={5} style={{maxHeight: '100px'}} placeholder="MESSAGE" errors={errors} touched={touched} title={'Message'} name={'message'}/>
                                                <br/>
                                                <button className="modal-submit">Submit</button>
                                            </Form>
                                        )
                                    }}
                            </Formik>
                            {/*<form>*/}
                            {/*    <input required className="modal-input" id="swal-name" type="text"*/}
                            {/*           placeholder="YOUR NAME"/>*/}
                            {/*    <input className="modal-input" id="swal-email" type="email" placeholder="COMPANY"/>*/}
                            {/*    <input className="modal-input" id="swal-phone" type="text" placeholder="EMAIL"/>*/}
                            {/*    <input className="modal-input" id="swal-phone" type="text"*/}
                            {/*           placeholder="PHONE"/>*/}
                            {/*    <textarea id="swal-message" className="modal-input"*/}
                            {/*              placeholder="MESSAGE" rows={5}> </textarea>*/}
                            {/*    <button onClick={closeModal} className="modal-submit">Submit</button>*/}
                            {/*</form>*/}
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