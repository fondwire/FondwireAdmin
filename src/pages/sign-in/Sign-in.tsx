import React from 'react';
import {Formik, Form, Field} from "formik";
import * as Yup from "yup";
import { SignInWrapper, SignWrapperStyle } from './Sign-in-style';
import AuthInput from "../../components/Auth-input/Auth-input";
import {YellowButton} from "../../components/Buttons/submit-button";
import { Link } from 'react-router-dom';
import {signInFirebase} from '../../firebase'

function SignWrapper() {
    return (
        <SignWrapperStyle>
            <Link to={'/'} className={'back'}>
                <img src="https://www.flaticon.com/svg/static/icons/svg/507/507257.svg" alt="<-"/>
            </Link>
            <SignIn />
        </SignWrapperStyle>
    );
}
export default SignWrapper;




const validateFormik = {

}

const initialValue = {
    email: '',
    password: ''
}
const SignIn = () => {
    return (
        <SignInWrapper>
            <div className={'title'}>Sign in</div>
            <Formik
                initialValues={initialValue}
                onSubmit={()=>{
                    signInFirebase('aman@gmail.com', 'qwerty123')
                        .then((res)=>{
                            console.log(res.user)
                        })
                }}
                validationSchema={Yup.object().shape(validateFormik)}
            >
                {
                    ({ values,
                         touched,
                         errors,
                         // initialValues,
                         isSubmitting,
                         handleChange,
                         handleBlur,
                     }) => {
                        return (
                            <Form>
                                <Field as={AuthInput} title={'Email'} type={'email'} name={'email'}/>
                                <Field as={AuthInput} title={'Password'} type={'password'} name={'password'}/>
                                <br/>
                                <YellowButton className={'fullWidth'}>Sign in</YellowButton>
                            </Form>
                        )
                    }}
            </Formik>
            <Link to={'#'} className={'forgot'}>Forgot your password?</Link>
        </SignInWrapper>
    )
}