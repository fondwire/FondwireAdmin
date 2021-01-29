import React, {useEffect, useReducer, useState} from 'react'
import {CreateCompanyWrapper, LogoWrapper} from './CreateCompanyStyle'
import {Field, Formik, FormikValues} from "formik";
import * as Yup from "yup";
import FeedCreateInput from "../../components/FeedCreateInput/FeedCreateInput";
import {SubmitButton} from "../../components/Buttons/submit-button";
import {useParams, Redirect, useHistory} from 'react-router-dom';
import Managers from "./Managers";
import {getData} from "../../App";
import reducer from "../../state/RootReducer";
import Preloader from "../../utils/preloader/preloader";
import deepEqual from "lodash.isequal";
import {storage} from "firebase";
import {db} from "../../firebase";

const validateFormik = {
    fullCompanyName: Yup.string()
        .required('Required field.'),
    shortCompanyName: Yup.string()
        .required('Required field.')
}

const initial = {
    fullCompanyName: '',
    shortCompanyName: '',
    websiteLink: '',
    logo: '',
    logo2: '',
    contact: {
        portrait: '',
        portrait2: '',
        name: '',
        position: '',
        phone: '',
        email: ''
    }
}

const CreateCompany = () => {
    const {id} = useParams()
    const [state] = useReducer(reducer, {
        userData: JSON.parse(localStorage.getItem('userData') as string),
    })
    const history = useHistory()
    const [data, setData] = useState<any>([])
    const [initialValue, setInitialValue] = useState<any>(initial)
    const [pending, setPending] = useState(true)

    useEffect(() => {
        if (data.length && id) {
            let comp = data.filter((el: any) => el.id === id)
            setData(comp[0])
            let {name, profileImageURL, ...val} = comp[0]
            setInitialValue({
                fullCompanyName: name,
                shortCompanyName: name,
                logo: profileImageURL,
                ...val
            })
        }
    }, [id, data])
    useEffect(() => {
        if (id) {
            getData(`/assets`, state, setData, setPending)
        } else {
            setPending(false)
        }
    }, [id, state])
    const upload = (logo: File) => storage().ref(`AssetContactPersonProfileImages/${logo.name}`).put(logo)
    const getUrl = async (name: string) => await storage()
        .ref("AssetContactPersonProfileImages")
        .child(name)
        .getDownloadURL()
        .then((url) => {
            return url
        })
    const redirect = () => history.push('/companies')
    const submit = (values: FormikValues, {setSubmitting}: FormikValues) => {
        let {logo2, logo, contact: {portrait, portrait2, ...contactVal}, ...value} = values
        // If admin uploaded logo of the company
        if (logo) {
            let file = logo.target.files[0]
            let uploadTask = upload(file)
            uploadTask.on("state_changed", () => {}, () => {},
                () => {
                    getUrl(file.name).then((logoUrl)=>{
                        // if admin upload the portrait of the user
                        if (portrait) {
                            let portrait = values.contact.portrait.target.files[0]
                            let uploadPortrait = upload(portrait)
                            uploadPortrait.on("state_changed", () => {}, () => {},
                                () => {
                                    getUrl(portrait.name).then((portraitUrl)=>{
                                        db.ref('/assets').child(values.fullCompanyName).set({
                                            profileImageURL: logoUrl,
                                            contact: {
                                                portrait: portraitUrl,
                                                ...contactVal
                                            },
                                            ...value
                                        }).then(redirect)
                                    })
                                })
                        } else {
                            db.ref('/assets').child(values.fullCompanyName).set({
                                profileImageURL: logoUrl,
                                contact: {
                                    portrait: '',
                                    ...contactVal
                                },
                                ...value
                            }).then(redirect)
                        }
                    })
                }
            )
        } else {
            // if admin uploaded a portrait of the user
            if (portrait) {
                let portrait = values.contact.portrait.target.files[0]
                let uploadPortrait = upload(portrait)
                uploadPortrait.on("state_changed", () => {}, () => {},
                    () => {
                        getUrl(portrait.name).then((portraitUrl)=>{
                            db.ref('/assets').child(values.fullCompanyName).set({
                                profileImageURL: '',
                                contact: {
                                    portrait: portraitUrl,
                                    ...contactVal
                                },
                                ...value
                            }).then(redirect)
                        })
                    })
            }else{
                db.ref('/assets').child(values.fullCompanyName).set({
                    profileImageURL: '',
                    contact: {
                        portrait: '',
                        ...contactVal
                    },
                    ...value
                }).then(redirect)
            }
        }
    }
    if (pending) return <Preloader/>
    return <CreateCompanyWrapper>
        <div className={'title'}>COMPANY PROFILE</div>

        <Formik
            initialValues={initialValue}
            validationSchema={Yup.object().shape(validateFormik)}
            onSubmit={submit}
        >
            {({
                  values,
                  errors,
                  // touched,
                  // handleChange,
                  // handleBlur,
                  handleSubmit,
                  isSubmitting,
                  setFieldValue
                  /* and other goodies */
              }) => {
                const hasErrors = Object.keys(errors).length > 0
                const hasChanged = id ? true : !deepEqual(values, initialValue)
                return (
                    <form onSubmit={handleSubmit}>
                        <Field disabled={id} as={FeedCreateInput} name={'fullCompanyName'} title={`FULL COMPANY NAME`}/>
                        <Field disabled={id} as={FeedCreateInput} name={'shortCompanyName'}
                               title={`SHORT COMPANY NAME (FOR APP DISPLAY)`}/>
                        <Field disabled={id} as={FeedCreateInput} name={'websiteLink'} title={`WEBSITE LINK`}/>
                        <div className={'logoTitle'}>LOGO</div>
                        <div className={'uploader'}>
                            <LogoWrapper>
                                {
                                    values.logo ?
                                        <img src={typeof values.logo === 'string' ? values.logo : values.logo2}
                                             alt="logo"/> : null
                                }
                            </LogoWrapper>
                            <div className={'buttons'}>
                                {
                                    !values.logo && !id ?
                                        <label className={'c_pointer'}>
                                            <span>UPLOAD NEW LOGO</span>
                                            <input id="file" name="logo" type="file" onChange={(event) => {
                                                const reader = new FileReader()
                                                if (event?.target?.files?.length) {
                                                    reader.readAsDataURL(event.target.files[0]);
                                                    reader.onload = (e: any) => {
                                                        const newUrl = e.target.result
                                                        setFieldValue('logo2', newUrl)
                                                    }
                                                }
                                                setFieldValue("logo", event)
                                            }}
                                                   accept="image/x-png,image/gif,image/jpeg"
                                                   className="input-file d-none"/>
                                        </label>
                                        :
                                        id ? null :
                                            <span className={'c_pointer'} onClick={() => setFieldValue('logo', '')}>DELETE EXISTING LOGO</span>
                                }
                            </div>
                        </div>
                        <Field disabled={id} as={FeedCreateInput} name={'contact.name'} title={`CONTACT PERSON NAME`}/>
                        <Field disabled={id} as={FeedCreateInput} name={'contact.position'}
                               title={`CONTACT PERSON POSITION`}/>
                        <Field disabled={id} as={FeedCreateInput} name={'contact.phone'}
                               title={`CONTACT PERSON PHONE`}/>
                        <Field disabled={id} as={FeedCreateInput} name={'contact.email'}
                               title={`CONTACT PERSON EMAIL`}/>
                        <div className={'uploader'}>
                            <LogoWrapper circle={true}>
                                {
                                    values.contact?.portrait
                                        ? <img src={
                                            typeof values.contact?.portrait === 'string' ? values.contact?.portrait
                                                : values.contact?.portrait2} alt="logo"/> : null
                                }
                            </LogoWrapper>
                            <div className={'buttons'}>
                                {
                                    !values.contact?.portrait && !id ?
                                        <label className={'c_pointer'}>
                                            <span>CONTACT PERSON PORTRAIT</span>
                                            <input id="file" name="portrait" type="file" onChange={(event) => {
                                                const reader = new FileReader()
                                                if (event?.target?.files?.length) {
                                                    reader.readAsDataURL(event.target.files[0]);
                                                    reader.onload = (e: any) => {
                                                        const newUrl = e.target.result
                                                        setFieldValue('contact.portrait2', newUrl)
                                                    }
                                                }
                                                setFieldValue("contact.portrait", event)
                                            }}
                                                   accept="image/x-png,image/gif,image/jpeg"
                                                   className="input-file d-none"/>
                                        </label>
                                        :
                                        id ? null :
                                            <span className={'c_pointer'}
                                                  onClick={() => setFieldValue('contact.portrait', '')}>DELETE EXISTING LOGO</span>
                                }
                            </div>
                        </div>
                        {/*{errors.email && touched.email && errors.email}*/}
                        {
                            !id ?
                                <SubmitButton type="submit" disabled={!hasChanged || hasErrors || isSubmitting}>
                                    Submit
                                </SubmitButton>
                                :
                                <Managers managers={values.managers}/>
                        }
                    </form>
                )
            }}
        </Formik>
    </CreateCompanyWrapper>
}

export default CreateCompany