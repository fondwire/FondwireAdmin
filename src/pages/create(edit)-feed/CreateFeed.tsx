import React, {useEffect, useReducer, useState} from 'react';
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
import ImageUploader from "../../components/image-uploader/ImageUploader";
import {storage} from 'firebase';
import reducer from "../../state/RootReducer";

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
    proofForImage: false,
    file: ''
}
const CreateFeed = React.memo(() => {
    const [state] = useReducer(reducer, {
        userData: JSON.parse(localStorage.getItem('userData') as string),
    })
    const {id, type, notificationId} = useParams()
    const history = useHistory()
    const [status, setStatus] = useState('New feed')
    const [editor, setEditor] = useState<any>(EditorState?.createEmpty())
    const [pending, setPending] = useState(true)
    const [initialValue, setInitialValue] = useState<any>(initialVal)
    // console.log(initialValue)
    // console.log(editor?.getCurrentContent().getPlainText('').length)
    const [userData] = useState(JSON.parse(localStorage.getItem('userData') as string))
    useEffect(() => {
        if (id) {
            setStatus(`Feed id: ${id}`)
            db.ref('/feeds').child(type + 's').child(id).once('value', (snapshot) => {
                return snapshot.toJSON()
            }).then((data: any) => {
                if (data.toJSON()) {
                    setInitialValue({file: data.toJSON()?.logo, ...data.toJSON()})
                    const blocksFromHtml = htmlToDraft(data.toJSON()?.bodyText);
                    const {contentBlocks, entityMap} = blocksFromHtml;
                    const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
                    const editorState = EditorState.createWithContent(contentState);
                    setEditor(editorState)
                    setPending(false)
                } else {
                    Swal.fire({
                        icon: "error",
                        html: `
                            <div class="save__wrapper">
                                <div class="step__wrapper">
                                   Feed is not found.
                                </div>
                            </div> 
                        `
                    }).then(()=>{
                        history.goBack()
                    })
                }
            })
        } else {
            setStatus('new feed')
            setTimeout(() => {
                setPending(false)
            }, 1000)
        }
    }, [id, type, history])
    const onSubmit = async (values: FormikValues, isPublish: boolean) => {
        await db.ref('users').child(state.userData.id).once('value', (s) => {
            return s.toJSON()
        }).then((res: any) => {
            let data = {
                fullname: res.toJSON()?.fullname,
                companyName: res.toJSON()?.companyName,
                ...values
            }
            onSub(data, isPublish)
        })
    }
    const onSub = async (values: FormikValues, isPublish: boolean) => {
        if (id) {
            // update the feed
            if (isPublish) {
                // if i am submitting
                if (typeof values.file !== "string") {
                    let file = values.file.target.files[0]
                    let uploadTask = storage().ref(`FeedsImages/${type + 's'}/${file.name}`).put(file)
                    uploadTask.on("state_changed", () => {
                        },
                        () => {
                        },
                        () => {
                            storage()
                                .ref("FeedsImages")
                                .child(type + 's')
                                .child(file.name)
                                .getDownloadURL()
                                .then(async (url) => {
                                    db.ref('/feeds').child(type + 's').child(id).child('logo').set(url)
                                        .then(() => {
                                            db.ref('/feeds').child(type + 's').child(id).child('isPublish').set(true)
                                                .then(() => {
                                                    db.ref('/notification').child('/feeds').child(`/${type}s`).push({
                                                        id: id,
                                                        issueDate: Date.now()
                                                    }).then(() => {
                                                        history.push('/feed')
                                                    })
                                                })
                                        })
                                })
                        })

                } else {
                    db.ref('/feeds').child(type + 's').child(id).child('isPublish').set(true)
                        .then(() => {
                            db.ref('/notification').child('/feeds').child(`/${type}s`).push({
                                id: id,
                                issueDate: Date.now()
                            }).then(() => {
                                history.push('/feed')
                            })
                        })
                }

            } else {
                // if i am re-saving
                if (typeof values.file === "string") {
                    let {file, ...data} = values
                    db.ref('/feeds').child(type + 's').child(id).set({
                        issueDate: Date.now(),
                        url: file,
                        ...data
                    }).then(() => {
                        history.push('/feed')
                    })
                }
                // db.ref('/feeds').child(type+'s').child(id).set({
                //     issueDate: Date.now(),
                //     ...values
                // }).then(()=>{
                //     history.push('/feed')
                // })
            }
        } else {
            // Create feed and save
            if (values.file) {
                let file = values.file.target.files[0]
                let uploadTask = storage().ref(`FeedsImages/${type + 's'}/${file.name}`).put(file)
                uploadTask.on("state_changed", () => {
                    },
                    () => {
                    },
                    () => {
                        storage()
                            .ref("FeedsImages")
                            .child(type + 's')
                            .child(file.name)
                            .getDownloadURL()
                            .then(async (url) => {
                                let {file, ...rest} = values
                                try {
                                    await db.ref('/feeds').child(`/${type}s`).push({
                                        ...rest,
                                        logo: url,
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
                                        if (isPublish) {
                                            //create notification
                                            db.ref('/notification').child('/feeds').child(`/${type}s`).push({
                                                id: newArr[newArr.length - 1],
                                                issueDate: Date.now()
                                            }).then(() => {
                                                history.push('/feed')
                                            })
                                        } else {
                                            history.push('/feed')
                                        }
                                    })
                                } catch (error) {
                                    // alert('some error with sending message')
                                    console.log(error.message)
                                }
                            })
                    })
            } else {
                db.ref('/feeds').child(`/${type}s`).push({
                    ...values,
                    logo: '',
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
                    if (isPublish) {
                        db.ref('/notification').child('/feeds').child(`/${type}s`).push({
                            id: newArr[newArr.length - 1],
                            issueDate: Date.now()
                        }).then(() => {
                            history.push('/feed')
                        })
                    } else {
                        history.push('/feed')
                    }
                })
            }
        }
    }
    const onApprove = () => {
        db.ref('/feeds')
            .child(type + 's')
            .child(id)
            .child('isAssetManagerApproved')
            .set(true)
            .then(() => {
                history.push('/feed')
            })
    }
    const onAdminApprove = (values: FormikValues) => {
        let {file, ...value} = values
        if (typeof file !== 'string') {
            let uploadTask = storage().ref(`FeedsImages/${type + 's'}/${file.name}`).put(file)
            uploadTask.on("state_changed", () => {
                },
                () => {
                },
                () => {
                    storage()
                        .ref("FeedsImages")
                        .child(type + 's')
                        .child(file.name)
                        .getDownloadURL()
                        .then(async (url) => {
                            let {file, ...rest} = values
                            db.ref('/feeds').child(type + 's').child(id).set({
                                url: url,
                                isAdminApproved: true,
                                ...rest
                            }).then(() => {
                                db.ref('/notification').child('/feeds').child(type + 's').child(notificationId).remove().then(() => {
                                    // alert('success set and removed')
                                    // setPending(true)
                                    window.location.href = '/notifications'
                                })
                            })
                        })
                })
        } else {
            db.ref('/feeds').child(type + 's').child(id).set({
                url: file,
                isAdminApproved: true,
                ...value
            }).then(() => {
                db.ref('/notification').child('/feeds').child(type + 's').child(notificationId).remove().then(() => {
                    // alert('success set and removed')
                    // setPending(true)
                    window.location.href = '/notifications'
                })
            })
        }
    }
    const MAX_LENGTH = 1000
    const _handleBeforeInput = () => {
        const currentContent = editor.getCurrentContent();
        const currentContentLength = currentContent.getPlainText('').length
        if (currentContentLength > MAX_LENGTH - 1) {
            return 'handled';
        }
    }

    const _handlePastedText = (pastedText: any) => {
        const currentContent = editor.getCurrentContent();
        const currentContentLength = currentContent.getPlainText('').length

        if (currentContentLength + pastedText.length > MAX_LENGTH) {
            // console.log('you can type max ten characters!');
            return 'handled';
        }
    }
    if (pending) return <div className={'preloaderWrapper'}><Preloader/></div>
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
                onSubmit={() => {
                }}
                validationSchema={Yup.object().shape(validateFormik)}
            >
                {
                    ({
                         values,
                         errors,
                         initialValues,
                         isSubmitting,
                         setFieldValue
                     }) => {
                        let {isPublish, isAdminApproved, isAssetManagerApproved} = values
                        let titleLength = 80
                        titleLength = titleLength - values.title.length
                        let teaserLength = 100
                        teaserLength = teaserLength - values.teaser.length
                        // const hasErrors = Object.keys(errors).length > 0;
                        const hasChanged = id ? true : !deepEqual(values, initialValues)
                        const hasErrors = Object.keys(errors).length > 0
                        const editLen = editor?.getCurrentContent().getPlainText('').length
                        const isVideo = type !== 'video' ? !editLen : false
                        // console.log(editLen)
                        const isAdminIsPublish = !state.userData.isAdmin && isPublish
                        return (
                            <Form>
                                <Field disabled={isPublish && !state.userData.isAdmin} as={FeedCreateInput}
                                       name={'title'} status={!!titleLength}
                                       title={`Title (${titleLength})`} maxLength={'80'}/>
                                <Field disabled={isPublish} as={FeedAddPrimp} name={'proofForTitle'}
                                       title={`Add pimp & proof for $14.50`}/>
                                <br/>
                                <Field disabled={isPublish && !state.userData.isAdmin} as={FeedCreateInput}
                                       name={'teaser'} status={!!teaserLength}
                                       title={`Teaser (${teaserLength})`} maxLength={'100'}/>
                                <Field disabled={isPublish} as={FeedAddPrimp} name={'proofForTeaser'}
                                       title={`Add pimp & proof for $14.50`}/>
                                <br/>
                                <Field disabled={editLen ? editLen : isPublish && !state.userData.isAdmin} as={FeedCreateInput}
                                       name={'link'}
                                       title={type === 'video' ? `Link to the video` : `EITHER: link to an external ${type}`}/>
                                <br/>
                                <br/>
                                {
                                    type !== 'video'
                                        ? <>
                                            <span className={MAX_LENGTH - editLen ? 'bodyText' : 'bodyText error'}>OR: write here ({MAX_LENGTH - editLen})</span>
                                            <br/>
                                            {
                                                isAdminIsPublish || isAdminApproved || values.link
                                                    ? <div
                                                        className="body__container"
                                                        dangerouslySetInnerHTML={{__html: draftToHtml(convertToRaw(editor.getCurrentContent()))}}
                                                    />
                                                    // stringToHTML(draftToHtml(convertToRaw(editor.getCurrentContent())))
                                                    : <Editor
                                                        handleBeforeInput={_handleBeforeInput}
                                                        // @ts-ignore
                                                        handlePastedText={_handlePastedText}
                                                        editorState={editor}
                                                        toolbarClassName="toolbarClassName"
                                                        wrapperClassName="wrapperClassName"
                                                        editorClassName={'editor_textarea'}
                                                        onEditorStateChange={(e) => setEditor(e)}
                                                        toolbar={{
                                                            inline: {inDropdown: false},
                                                            fontFamily: {
                                                                options: ['Gotham Book', 'Gotham-Thin', 'Gotham-Bold', 'Gotham-Medium']
                                                            },
                                                            colorPicker: {visible: false, icon: undefined,},
                                                            image: {
                                                                uploadCallback: uploadCallback,
                                                                previewImage: true,
                                                                alt: {present: true, mandatory: false},
                                                                inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg',
                                                                visible: false,
                                                                icon: undefined,
                                                                className: "removeImageUploader",
                                                                component: undefined,
                                                                popupClassName: undefined,
                                                                fileUpload: false,
                                                                url: true,
                                                            },
                                                        }}
                                                    />
                                            }
                                            <Field disabled={isPublish} as={FeedAddPrimp} name={'proofForMessage'}
                                                   title={`Add pimp & proof for $39.50`}/>
                                            <br/>
                                            <ImageUploader id={id} setImage={() => setFieldValue('file', '')}
                                                           image={values.file}/>
                                            {
                                                isAdminIsPublish ? null : <label>
                                                    <ImageUploader btn={true} image={values.file}/>
                                                    <input id="file" name="file" type="file" onChange={(event) => {
                                                        setFieldValue("file", event)
                                                    }}
                                                           accept="image/x-png,image/gif,image/jpeg"
                                                           className="input-file"/>
                                                </label>
                                            }
                                            <Field disabled={isPublish} as={FeedAddPrimp} name={'proofForImage'}
                                                   title={`Add image select & create service for $14.50`}/>

                                        </>
                                        : null
                                }
                                <div className={'btn__wrapper'}>
                                    {
                                        isPublish ? <div/>
                                            // submit by Manager to save feed
                                            : <SubmitButton
                                                disabled={!values.title}
                                                type={'button'}
                                                onClick={() => {
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
                                                    }).then((result) => {
                                                        if (result.isConfirmed) {
                                                            onSubmit(values, false)
                                                        }
                                                    })
                                                }}
                                            >
                                                save
                                            </SubmitButton>
                                    }
                                    {
                                        state.userData.isAdmin
                                            ? <SubmitButton
                                                type={"button"}
                                                onClick={() => {
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
                                                    }).then((result) => {
                                                        if (result.isConfirmed) {
                                                            onAdminApprove(values)
                                                        }
                                                    })
                                                }}
                                            >Approve</SubmitButton>
                                            : null
                                    }
                                    {
                                        isPublish && isAdminApproved && isAssetManagerApproved
                                            ? null
                                            : !isAssetManagerApproved && !isAdminApproved && isPublish
                                            // Approve by Super-Admin
                                            ? null
                                            : isAdminApproved && isPublish
                                                //    Approve by Asset-Manager
                                                ? <SubmitButton
                                                    type={"button"}
                                                    onClick={() => {
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
                                                        }).then((result) => {
                                                            if (result.isConfirmed) {
                                                                onApprove()
                                                            }
                                                        })
                                                    }}
                                                >Approve</SubmitButton>
                                                //    onSubmit by Manager to create feed
                                                : <SubmitButton
                                                    disabled={isVideo || !hasChanged || hasErrors || isSubmitting}
                                                    onClick={() => {
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
                                                        }).then((result) => {
                                                            if (result.isConfirmed) {
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
})


export default CreateFeed;