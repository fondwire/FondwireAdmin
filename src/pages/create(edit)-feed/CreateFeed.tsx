import React, {useEffect, useState} from 'react';
import {useParams, useHistory} from 'react-router-dom';
import {CreatePageWrapper} from './Create-page';
import {Formik, Field, Form, FormikValues} from "formik";
import * as Yup from "yup";
import deepEqual from 'lodash.isequal';
import FeedCreateInput, {FeedAddPrimp} from "../../components/FeedCreateInput/FeedCreateInput";
import {Editor} from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import {SubmitButton} from '../../components/Buttons/submit-button';
import draftToHtml from "draftjs-to-html";
import {EditorState, convertToRaw, ContentState} from "draft-js";
import {db} from "../../firebase";
import Swal from "sweetalert2";
import Preloader from "../../utils/preloader/preloader";
import htmlToDraft from 'html-to-draftjs'

const validateFormik = {
    title: Yup.string()
        .required('Required field.'),
    teaser: Yup.string()
        .required('Required field.')
}


const uploadCallback = async (file: any) => {
    return await new Promise(
        (resolve) => {
            let reader = new FileReader();

            reader.onloadend = function () {
                resolve({data: {link: reader.result}})
            }
            reader.readAsDataURL(file);
        }
    )
}

let initialVal = {
    title: '',
    teaser: '',
    link: '',
    proofForTeaser: false,
    proofForTitle: false,
    proofForMessage: false,
    proofForImage: false
}
function CreateFeed() {
    const {id, type} = useParams()
    const history = useHistory()
    const [status, setStatus] = useState('New feed')
    const [editor, setEditor] = useState<any>(EditorState?.createEmpty())
    const [pending, setPending] = useState(true)
    const [initialValue, setInitialValue] = useState<any>(initialVal)
    // console.log(editor?.getCurrentContent().getPlainText('').length)
    const [userData] = useState(JSON.parse(localStorage.getItem('userData') as string))
    useEffect(() => {
        if (id) {
            setStatus(`Feed id: ${id}`)
            db.ref('/feeds').child(type+'s').child(id).once('value', (snapshot)=>{
                return snapshot.toJSON()
            }).then((data)=>{
                setInitialValue(data.toJSON())
                // @ts-ignore
                const blocksFromHtml = htmlToDraft(data.toJSON()?.bodyText);
                const { contentBlocks, entityMap } = blocksFromHtml;
                const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
                const editorState = EditorState.createWithContent(contentState);
                setEditor(editorState)
                setPending(false)
            })
        } else {
            setStatus('new feed')
            setTimeout(()=>{
                setPending(false)
            }, 1000)
        }
    }, [id, type])
    const onSubmit = (values: FormikValues, isPublish:boolean) => {
        db.ref('/feeds').child(`/${type}s`).push({
            ...values,
            bodyText: type !== 'video' ? draftToHtml(convertToRaw(editor.getCurrentContent())) : '',
            issueDate: Date.now(),
            uid: userData.uid,
            type: type,
            isAdminApproved: false,
            isAssetManagerApproved: false,
            isPublish: isPublish
        }).then((res) => {
            let arr: any = res.toJSON()
            let newArr = arr.split('/')
            if(isPublish){
                db.ref('/notification').child('/feeds').child(`/${type}s`).push({
                    id: newArr[newArr.length - 1],
                    issueDate: Date.now()
                }).then(() => {
                    history.push('/feed')
                })
            }else{
                history.push('/feed')
            }
        })
    }
    const onApprove = () => {
        db.ref('/feeds')
            .child(type+'s')
            .child(id)
            .child('isAssetManagerApproved')
            .set(true)
            .then(()=>{
                history.push('/feed')
            })
    }
    if(pending) return <div className={'preloaderWrapper'}><Preloader/></div>
    return (
        <CreatePageWrapper>
            <div>
                {
                    <div>
                        <img onClick={() => history.goBack()}
                             src="https://www.flaticon.com/svg/static/icons/svg/507/507257.svg" alt="<-"/>
                    </div>
                }
                <h3>{status.toUpperCase()}</h3>
            </div>
            <Formik
                initialValues={initialValue}
                onSubmit={()=>{}}
                validationSchema={Yup.object().shape(validateFormik)}
            >
                {
                    ({
                         values,
                         errors,
                         initialValues,
                         isSubmitting,
                     }) => {
                        let {isPublish, isAdminApproved} = values
                        let titleLength = 80
                        titleLength = titleLength - values.title.length
                        let teaserLength = 100
                        teaserLength = teaserLength - values.teaser.length
                        // const hasErrors = Object.keys(errors).length > 0;
                        const hasChanged = !deepEqual(values, initialValues)
                        const hasErrors = Object.keys(errors).length > 0
                        const editLen = !editor?.getCurrentContent().getPlainText('').length
                        const isVideo = type !== 'video' ? editLen : false
                        return (
                            <Form>
                                <Field disabled={isPublish} as={FeedCreateInput} name={'title'} status={!!titleLength}
                                       title={`Title (${titleLength})`} maxLength={'80'}/>
                                <Field disabled={isPublish} as={FeedAddPrimp} name={'proofForTitle'} title={`Add pimp & proof for $14.50`}/>
                                <br/>
                                <Field disabled={isPublish} as={FeedCreateInput} name={'teaser'} status={!!teaserLength}
                                       title={`Teaser (${teaserLength})`} maxLength={'100'}/>
                                <Field disabled={isPublish} as={FeedAddPrimp} name={'proofForTeaser'} title={`Add pimp & proof for $14.50`}/>
                                <br/>
                                <Field disabled={isPublish} as={FeedCreateInput} name={'link'}
                                       title={'Link to external article (optional)'}/>
                                <br/>
                                <br/>
                                {
                                    type !== 'video'
                                        ? <>
                                            <span className={'bodyText'}>Body text</span>
                                            <br/>
                                            <Editor
                                                editorState={editor}
                                                toolbarClassName="toolbarClassName"
                                                wrapperClassName="wrapperClassName"
                                                editorClassName={'editor_textarea'}
                                                onEditorStateChange={(e) => {
                                                    // console.log(+editor?.getCurrentContent().getPlainText('').length)
                                                    // if(editor?.getCurrentContent().getPlainText('').length <= 10){
                                                    setEditor(e)
                                                    // }
                                                }}
                                                toolbar={{
                                                    inline: {inDropdown: false},
                                                    // list: { inDropdown: true },
                                                    // textAlign: { inDropdown: true },
                                                    // link: { inDropdown: true },
                                                    // history: { inDropdown: true },
                                                    fontFamily: {
                                                        options: ['Gotham Book', 'Gotham-Thin', 'Gotham-Bold', 'Gotham-Medium']
                                                    },
                                                    colorPicker: {visible: false, icon: undefined,},
                                                    image: {
                                                        uploadCallback: uploadCallback,
                                                        previewImage: true,
                                                        alt: {present: true, mandatory: false},
                                                        inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg',
                                                        visible: true,
                                                        fileUpload: true,
                                                        url: true,
                                                    },
                                                }}
                                            />
                                            <Field disabled={isPublish} as={FeedAddPrimp} name={'proofForMessage'}
                                                   title={`Add pimp & proof for $39.50`}/>
                                            <br/>
                                            <Field disabled={isPublish} as={FeedAddPrimp} name={'proofForImage'}
                                                   title={`Add image select & create service for $14.50`}/>
                                        </>
                                        : null
                                }

                                <div className={'btn__wrapper'}>
                                    {
                                        isPublish ? <div/> : <SubmitButton
                                            disabled={!hasChanged || hasErrors || isSubmitting || isVideo}
                                            type={'button'}
                                            onClick={()=>{
                                                Swal.fire({
                                                    icon: "info",
                                                    showCloseButton: true,
                                                    confirmButtonText: 'Save',
                                                    // showDenyButton: true,
                                                    html: `
                                                    <div class="save__wrapper">
                                                        <div class="step__wrapper">
                                                            <span class="step__number">1. </span>
                                                            <span class="step__text">This is first step to save.</span>
                                                        </div>
                                                        <div class="step__wrapper">
                                                            <span class="step__number">2. </span>
                                                            <span class="step__text">This is first step.</span>
                                                        </div>
                                                        <div class="step__wrapper">
                                                            <span class="step__number">3. </span>
                                                            <span class="step__text">This is first step.</span>
                                                        </div>
                                                    </div>
                                                `
                                                }).then((result)=>{
                                                    if(result.isConfirmed){
                                                        onSubmit(values, false)
                                                    }
                                                })
                                            }}
                                        >
                                            save
                                        </SubmitButton>
                                    }
                                    {
                                        isAdminApproved
                                            ? <SubmitButton
                                                type={"button"}
                                                onClick={()=>{
                                                    Swal.fire({
                                                        icon: "success",
                                                        showCloseButton: true,
                                                        confirmButtonText: "Submit",
                                                        html: `
                                                    <div class="save__wrapper">
                                                        <div class="step__wrapper">
                                                            <span class="step__number">1. </span>
                                                            <span class="step__text">This is first step to submit.</span>
                                                        </div>
                                                        <div class="step__wrapper">
                                                            <span class="step__number">2. </span>
                                                            <span class="step__text">This is first step.</span>
                                                        </div>
                                                        <div class="step__wrapper">
                                                            <span class="step__number">3. </span>
                                                            <span class="step__text">This is first step.</span>
                                                        </div>
                                                    </div>
                                                `
                                                    }).then((result)=>{
                                                        if(result.isConfirmed){
                                                            onApprove()
                                                        }
                                                    })
                                                }}
                                            >Approve</SubmitButton>
                                            : <SubmitButton
                                                disabled={isVideo || !hasChanged || hasErrors || isSubmitting }
                                                onClick={()=>{
                                                    Swal.fire({
                                                        icon: "success",
                                                        showCloseButton: true,
                                                        confirmButtonText: "Submit",
                                                        html: `
                                                    <div class="save__wrapper">
                                                        <div class="step__wrapper">
                                                            <span class="step__number">1. </span>
                                                            <span class="step__text">This is first step to submit.</span>
                                                        </div>
                                                        <div class="step__wrapper">
                                                            <span class="step__number">2. </span>
                                                            <span class="step__text">This is first step.</span>
                                                        </div>
                                                        <div class="step__wrapper">
                                                            <span class="step__number">3. </span>
                                                            <span class="step__text">This is first step.</span>
                                                        </div>
                                                    </div>
                                                `
                                                    }).then((result)=>{
                                                        if(result.isConfirmed){
                                                            onSubmit(values, true)
                                                        }
                                                    })
                                                }}
                                                type={'button'}
                                            >
                                                submit
                                            </SubmitButton>
                                    }

                                </div>
                            </Form>
                        )
                    }
                }
            </Formik>
        </CreatePageWrapper>
    );
}


export default CreateFeed;