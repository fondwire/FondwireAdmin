import React, {useContext} from 'react';
import {Formik, Form, Field} from "formik";
import * as Yup from "yup";
import { SignInWrapper, SignWrapperStyle } from './Sign-in-style';
import AuthInput from "../../components/Auth-input/Auth-input";
import {YellowButton} from "../../components/Buttons/submit-button";
import { Link } from 'react-router-dom';
import {db, signInFirebase} from '../../firebase'
import {MyContext} from "../../App";
import {SIGN_IN_TYPE} from "../../state/RootReducer";

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
const SignIn = () => {
    const {dispatch} = useContext(MyContext)

    return (
        <SignInWrapper>
            <div className={'title'}>Sign in</div>
            <Formik
                initialValues={initialValue}
                validationSchema={Yup.object().shape(validateFormik)}
                onSubmit={(values)=>{
                    signInFirebase(values.email, values.password)
                        .then((res)=>{
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
                                localStorage.setItem('userData', JSON.stringify(data))
                                dispatch({
                                    type: SIGN_IN_TYPE,
                                    data: data
                                })
                            })
                        }, () => {
                            alert('Not correct')
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
                                <Field as={AuthInput} errors={errors} touched={touched} title={'Email'} type={'email'} name={'email'}/>
                                <Field as={AuthInput} errors={errors} touched={touched} title={'Password'} type={'password'} name={'password'}/>
                                <br/>
                                <YellowButton type={'submit'} className={'fullWidth'}>Sign in</YellowButton>
                            </Form>
                        )
                    }}
            </Formik>
            <Link to={'#'} className={'forgot'}>Forgot your password?</Link>
        </SignInWrapper>
    )
}