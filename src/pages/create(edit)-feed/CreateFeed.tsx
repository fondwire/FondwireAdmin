import React, {useEffect, useState} from 'react';
import {useParams, useHistory} from 'react-router-dom';
import {CreatePageWrapper} from './Create-page';
import {Formik, Field, Form} from "formik";
import * as Yup from "yup";
import deepEqual from 'lodash.isequal';
import FeedCreateInput, {FeedAddPrimp} from "../../components/FeedCreateInput/FeedCreateInput";
import {Editor, EditorState} from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import {SubmitButton} from '../../components/Buttons/submit-button';
import draftToHtml from "draftjs-to-html";
import {convertToRaw} from "draft-js";
import {db} from "../../firebase";
// import draftToHtml from 'draftjs-to-html';


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

const initialValue = {
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
    const [editor, setEditor] = useState<EditorState>(EditorState?.createEmpty())
    // console.log(editor?.getCurrentContent().getPlainText('').length)
    const [userData] = useState(JSON.parse(localStorage.getItem('userData') as string))
    useEffect(() => {
        if (id) {
            setStatus(`Feed id: ${id}`)
        } else {
            setStatus('new feed')
        }
    }, [id])
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
                onSubmit={(values) => {
                    db.ref('/feeds').child(`/${type}s`).push({
                        ...values,
                        bodyText: draftToHtml(convertToRaw(editor.getCurrentContent())),
                        issueDate: Date.now(),
                        uid: userData.uid,
                        type: type,
                        isAdminApproved: false,
                        isAssetManagerApproved: false,
                    }).then((res) => {
                        let arr: any = res.toJSON()
                        let newArr = arr.split('/')
                        db.ref('/notification').child('/feeds').child(`/${type}s`).push({
                            id: newArr[newArr.length - 1],
                            issueDate: Date.now()
                        }).then(() => {
                            history.push('/feed')
                        })
                    })
                    // console.log(
                    //     {
                    //         ...values,
                    //         status: 'pending',
                    //         bodyText: draftToHtml(convertToRaw(editor.getCurrentContent())),
                    //         issueDate: Date.now(),
                    //         uid: userData.uid,
                    //         type: type
                    //     }
                    // )
                }}
                validationSchema={Yup.object().shape(validateFormik)}
            >
                {
                    ({
                         values,
                         errors,
                         initialValues,
                         isSubmitting,
                     }) => {
                        let titleLength = 80
                        titleLength = titleLength - values.title.length
                        let teaserLength = 100
                        teaserLength = teaserLength - values.teaser.length
                        // const hasErrors = Object.keys(errors).length > 0;
                        const hasChanged = !deepEqual(values, initialValues);
                        const hasErrors = Object.keys(errors).length > 0;
                        return (
                            <Form>
                                <Field as={FeedCreateInput} name={'title'} status={!!titleLength}
                                       title={`Title (${titleLength})`} maxLength={'80'}/>
                                <Field as={FeedAddPrimp} name={'proofForTitle'} title={`Add pimp & proof for $14.50`}/>
                                <br/>
                                <Field as={FeedCreateInput} name={'teaser'} status={!!teaserLength}
                                       title={`Teaser (${teaserLength})`} maxLength={'100'}/>
                                <Field as={FeedAddPrimp} name={'proofForTeaser'} title={`Add pimp & proof for $14.50`}/>
                                <br/>
                                <Field as={FeedCreateInput} name={'link'}
                                       title={'Link to external article (optional)'}/>
                                <br/>
                                <br/>
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
                                <Field as={FeedAddPrimp} name={'proofForMessage'}
                                       title={`Add pimp & proof for $39.50`}/>
                                <br/>
                                <Field as={FeedAddPrimp} name={'proofForImage'}
                                       title={`Add image select & create service for $14.50`}/>
                                <div className={'btn__wrapper'}>
                                    <SubmitButton
                                        disabled={!hasChanged || hasErrors || isSubmitting || !editor?.getCurrentContent().getPlainText('').length}
                                        type={'submit'}
                                    >
                                        save
                                    </SubmitButton>
                                    <SubmitButton
                                        disabled={!hasChanged || hasErrors || isSubmitting || !editor?.getCurrentContent().getPlainText('').length}
                                        type={'submit'}
                                    >
                                        submit
                                    </SubmitButton>
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