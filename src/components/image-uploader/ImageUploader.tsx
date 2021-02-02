import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {useTranslation} from "react-i18next";

const ImageUploaderWrapper:any = styled.div`
  width: 100%;
  display: ${(props:any) => props.image ? 'block' : 'none' };
  //max-height: 350px;
  border: 1px solid rgba(0,0,0,0.4);
  border-radius: 2px;
  text-align:center;
  cursor: ${(props:any) => props.btn ? 'pointer' : 'default' };
  background: rgba(237,242,246);
  position: relative;
  &>img{
    margin: 15px 0 10px 0;
    max-height: 250px;
    //max-width: 100%;
  }
  &>.remove{
    height: 30px;
    width: 30px;
    position:absolute;
    right: 15px;
    cursor:pointer;
  }
  &>.addImage{
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: 400;
    font-family: 'Gotham Book', sans-serif;
    color: #2f9dfb;
    margin: 15px 0;
  }
`

interface ImageUploaderProps {
    image: any
    btn?: boolean
    setImage?: ()=> void
    id?: number | string
}
const ImageUploader:React.FC<ImageUploaderProps> = (props) => {
    // console.log(props)
    const {t} = useTranslation()
    const [image, setImage] = useState('')
    useEffect(()=>{
        const reader = new FileReader()
        if(props.image?.target?.files?.length) {
            reader.readAsDataURL(props.image?.target.files[0]);
            reader.onload = (e: any) => {
                const newUrl = e.target.result
                setImage( newUrl)
            }
        }else if(props.id){
            setImage( props.image)
        }else{
            setImage('')
        }
    }, [props.image, props.id])
    return (
        <ImageUploaderWrapper image={props.btn || image} btn={props.btn} >
            {
                !props.btn && image && !props.id
                    ? <img onClick={props.setImage} className={'remove'} src="https://www.flaticon.com/svg/static/icons/svg/1828/1828666.svg" alt="x"/>
                    : null
            }
            {
                props.btn && image
                    ? <div className={'addImage'}> Delete and change </div>
                    : props.btn ? <div className={'addImage'}> + {t("assetManagerHomeScreen.addImage")} </div>
                    : <img src={image} alt="#"/>
            }
        </ImageUploaderWrapper>
    );
}

export default ImageUploader;

// const CompanyLogoUploaderWrapper = styled.div`
//   text-transform: uppercase;
//   font-size: 12px;
//   font-weight: 600;
//   color: rgba(0,0,0,0.6);
//   letter-spacing: 1px;
//
// `
// export const CompanyImageUploader:React.FC<ImageUploaderProps> = (props) => {
//     const [image, setImage] = useState('')
//     useEffect(()=>{
//         const reader = new FileReader()
//         if(props.image?.target?.files?.length) {
//             reader.readAsDataURL(props.image?.target.files[0]);
//             reader.onload = (e: any) => {
//                 const newUrl = e.target.result
//                 setImage( newUrl)
//             }
//         }else if(props.id){
//             setImage( props.image)
//         }else{
//             setImage('')
//         }
//     }, [props.image, props.id])
//     return <CompanyLogoUploaderWrapper>
//         <div>LOGO</div>
//         <div></div>
//     </CompanyLogoUploaderWrapper>
// }