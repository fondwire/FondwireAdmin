import React, {useEffect, useState} from 'react';
import {useParams, useHistory} from 'react-router-dom';
import {CreatePageWrapper} from './Create-page';
import {Formik, Field, Form} from "formik";
import * as Yup from "yup";
import FeedCreateInput from "../../components/FeedCreateInput/FeedCreateInput";
import { Editor, EditorState } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { SubmitButton } from '../../components/Buttons/submit-button';
// import draftToHtml from 'draftjs-to-html';


const validateFormik = {

}



const uploadCallback = async (file: any) => {
    return await new Promise(
        (resolve) => {
            let reader = new FileReader();

            reader.onloadend = function () {
                resolve({ data: { link: reader.result } })
            }
            reader.readAsDataURL(file);
        }
    )
}

const initialValue = {
    title: '',
    teaser: '',
    link: ''
}
function CreateFeed() {
    const {id} = useParams()
    const history = useHistory()
    const [status, setStatus] = useState('New feed')
    const [editor, setEditor] = useState<EditorState>(EditorState?.createEmpty())

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
                onSubmit={()=>{}}
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
                        let titleLength = 80
                        titleLength = titleLength - values.title.length
                        let teaserLength = 100
                        teaserLength = teaserLength - values.teaser.length
                        // const hasErrors = Object.keys(errors).length > 0;
                        return (
                            <Form>
                                <Field as={FeedCreateInput} name={'title'} status={!!titleLength} title={`Title (${titleLength})`} maxLength={'80'} />
                                <Field as={FeedCreateInput} name={'teaser'} status={!!teaserLength} title={`Teaser (${teaserLength})`} maxLength={'100'} />
                                <Field as={FeedCreateInput} name={'link'} title={'Link to external article (optional)'} />
                                <Editor
                                    editorState={editor}
                                    toolbarClassName="toolbarClassName"
                                    wrapperClassName="wrapperClassName"
                                    editorClassName={'editor_textarea'}
                                    onEditorStateChange={(e) => {
                                        setEditor(e)
                                    }}
                                    toolbar={{
                                        inline: { inDropdown: false },
                                        // list: { inDropdown: true },
                                        // textAlign: { inDropdown: true },
                                        // link: { inDropdown: true },
                                        // history: { inDropdown: true },
                                        fontFamily: {
                                            options: ['Gotham Book', 'Gotham-Thin', 'Gotham-Bold', 'Gotham-Medium']
                                        },
                                        colorPicker: { visible: false, icon: undefined, },
                                        image: {
                                            uploadCallback: uploadCallback,
                                            previewImage: true,
                                            alt: { present: true, mandatory: false },
                                            inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg',
                                            visible: true,
                                            fileUpload: true,
                                            url: true,
                                        },
                                    }}
                                />
                                <SubmitButton>
                                    Approve and submit (12)
                                </SubmitButton>
                            </Form>
                        )
                    }
                }
            </Formik>
        </CreatePageWrapper>
    );
}

export default CreateFeed;