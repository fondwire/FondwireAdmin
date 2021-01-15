import React from 'react';
// import {Formik, Form, Field} from "formik";
// import * as Yup from "yup";
// import { SignInWrapper, SignWrapperStyle } from './Sign-in-style';
// import AuthInput from "../../components/Auth-input/Auth-input";
// import {YellowButton} from "../../components/Buttons/submit-button";
// import { Link, useHistory } from 'react-router-dom';
// import {auth, db, signInFirebase} from '../../firebase'
// import {MyContext} from "../../App";
// import {SIGN_IN_TYPE} from "../../state/RootReducer";
// import Swal from "sweetalert2";
// import {firestore} from "firebase";
//
//
// const SignWrapper:React.FC = (props) => {
//     return (
//         <SignWrapperStyle>
//             <Link to={'/'} className={'back'}>
//                 <img src="https://www.flaticon.com/svg/static/icons/svg/507/507257.svg" alt="<-"/>
//             </Link>
//             {props.children}
//         </SignWrapperStyle>
//     );
// }
// export default SignWrapper;
//
//
//
//
// const validateFormik = {
//     email: Yup.string()
//         .required('Required'),
//     password: Yup.string()
//         .required('Required')
//         .min(6)
// }
//
// const initialValue = {
//     email: '',
//     password: ''
// }
// export const SignIn = () => {
//     const {dispatch} = useContext(MyContext)
//
//     return (
//         <SignInWrapper>
//             <div className={'title'}>Sign in</div>
//             <Formik
//                 initialValues={initialValue}
//                 validationSchema={Yup.object().shape(validateFormik)}
//                 onSubmit={(values)=>{
//                     signInFirebase(values.email, values.password)
//                         .then((res)=>{
//                             let user:any = res.user?.toJSON()
//                             let data: any = {
//                                 isAdmin: false,
//                                 ...res.user?.toJSON()
//                             }
//                             db.ref('/admins').once('value', function(snapshot){
//                                 return snapshot.toJSON()
//                             }).then((d)=>{
//                                 let admins = Object.values(d.toJSON() as string)
//                                 admins.forEach((admin) => {
//                                     if(admin === user.uid){
//                                         data = {isAdmin: true, ...res.user?.toJSON()}
//                                     }
//                                 })
//                                 if(!data.isAdmin){
//                                     let ref = db.ref('/users')
//                                     ref.orderByChild("email").on("child_added", function(snapshot) {
//                                         // console.log(snapshot.key)
//                                         if(snapshot.val().email === data.email){
//                                             // console.log(snapshot.key + " : " + snapshot.val().email );
//                                             // console.log(snapshot.val().verified)
//                                             data = {
//                                                 verified: snapshot.val().verified ? snapshot.val().verified : false,
//                                                 id: snapshot.key,
//                                                 ...data
//                                             }
//                                             localStorage.setItem('userData', JSON.stringify(data))
//                                             dispatch({
//                                                 type: SIGN_IN_TYPE,
//                                                 data: data
//                                             })
//                                         }
//                                     });
//                                 }
//                                 localStorage.setItem('userData', JSON.stringify(data))
//                                 dispatch({
//                                     type: SIGN_IN_TYPE,
//                                     data: data
//                                 })
//                             })
//                         }, (error) => {
//                             console.log(error.message)
//                             Swal.fire({
//                                 icon: 'error',
//                                 title: `<span style="font-family: 'Gotham-Medium', sans-serif;">Something went wrong.</span>`,
//                                 html: `<span style="font-family: 'Gotham-Medium', sans-serif">${error?.message ? error.message : 'You can try later!'}</span>`,
//                             }).then((result)=>{
//                                 if (result.isConfirmed) {
//                                     localStorage.removeItem('userData')
//                                     dispatch({
//                                         type: SIGN_IN_TYPE,
//                                         data: null
//                                     })
//                                 }
//                             })
//                         })
//                 }}
//             >
//                 {
//                     ({
//                          touched,
//                          errors,
//                      }) => {
//                         return (
//                             <Form>
//                                 <Field as={AuthInput} errors={errors} touched={touched} title={'Email'} type={'email'} name={'email'}/>
//                                 <Field as={AuthInput} errors={errors} touched={touched} title={'Password'} type={'password'} name={'password'}/>
//                                 <br/>
//                                 <YellowButton type={'submit'} className={'fullWidth'}>Sign in</YellowButton>
//                             </Form>
//                         )
//                     }}
//             </Formik>
//             <Link to={'/forgot'} className={'forgot'}>Forgot your password?</Link>
//         </SignInWrapper>
//     )
// }
//
// const validateFormikSignUp = {
//     email: Yup.string()
//         .required('Required'),
//     fullname: Yup.string()
//         .required('Required'),
//     companyName: Yup.string()
//         .required('Required'),
// }
//
// const initialValueSignUp = {
//     email: '',
//     fullname: '',
//     companyName: '',
//     position: ''
// }
// export const SignUp = () => {
//     // const {dispatch} = useContext(MyContext)
//     const history = useHistory()
//     return (
//         <SignInWrapper>
//             <div className={'title'}>
//                 Request Contact
//             </div>
//             <Formik
//                 initialValues={initialValueSignUp}
//                 validationSchema={Yup.object().shape(validateFormikSignUp)}
//                 onSubmit={(values)=>{
//                     firestore().collection('mail').add(values).then(()=>{
//                         Swal.fire({
//                             icon: 'success',
//                             title: `<div class="medium">Message sent.</div>`,
//                             html: ` <div class="save__wrapper"> Some message. </div>  `
//                         }).then(()=>{
//                             history.push('/')
//                         })
//                     }, (error)=>{
//                         Swal.fire({
//                             icon: 'error',
//                             title: '<div class="medium">Something wend wrong, try later.</div>',
//                             html: ` <div class="save__wrapper"> ${error} </div>  `
//                         }).then(()=>{})
//                     })
//                 }}
//             >
//                 {
//                     ({
//                          touched,
//                          errors,
//                      }) => {
//                         return (
//                             <Form>
//                                 <Field as={AuthInput} errors={errors} touched={touched} title={'Full Name'} type={'text'} name={'fullname'}/>
//                                 <Field as={AuthInput} errors={errors} touched={touched} title={'Email'} type={'email'} name={'email'}/>
//                                 <Field as={AuthInput} errors={errors} touched={touched} title={'Company name'} type={'text'} name={'companyName'}/>
//                                 <Field as={AuthInput} errors={errors} touched={touched} title={'Position'} type={'text'} name={'position'}/>
//                                 <br/>
//                                 <YellowButton type={'submit'} className={'fullWidth'}>Submit</YellowButton>
//                             </Form>
//                         )
//                     }}
//             </Formik>
//         </SignInWrapper>
//     )
// }
//
// const validateFormikForgot = {
//     email: Yup.string()
//         .required('Required'),
// }
//
// const initialValueForgot = {
//     email: ''
// }
// export const Forgot = () => {
//     // const {dispatch} = useContext(MyContext)
//     const history = useHistory()
//     return (
//         <SignInWrapper>
//             <div className={'title'}>
//                 Forgot Password
//             </div>
//             <Formik
//                 initialValues={initialValueForgot}
//                 validationSchema={Yup.object().shape(validateFormikForgot)}
//                 onSubmit={(values)=>{
//                     auth().sendPasswordResetEmail(values.email)
//                         .then(()=>{
//                             Swal.fire({
//                                 icon: "success",
//                                 title: `<span style="font-family: 'Gotham-Medium', sans-serif;">SENT</span>`,
//                                 html: `<span style="font-family: 'Gotham-Medium', sans-serif">We have send a message to your email. Please check.</span>`,
//                             }).then(()=>{
//                                 history.push('/sign-in')
//                             })
//                         }, (error) => {
//                             Swal.fire({
//                                 icon: "error",
//                                 title: `<span style="font-family: 'Gotham-Medium', sans-serif;">Error</span>`,
//                                 html: `<span style="font-family: 'Gotham-Medium', sans-serif">${error.message}</span>`,
//                             }).then(()=>{
//                                 // history.push('/sign-in')
//                             })
//                         })
//                 }}
//             >
//                 {
//                     ({
//                          touched,
//                          errors,
//                      }) => {
//                         return (
//                             <Form>
//                                 <Field as={AuthInput} errors={errors} touched={touched} title={'Email'} type={'email'} name={'email'}/>
//                                 <br/>
//                                 <YellowButton type={'submit'} className={'fullWidth'}>Submit</YellowButton>
//                             </Form>
//                         )
//                     }
//                 }
//             </Formik>
//         </SignInWrapper>
//     )
// }