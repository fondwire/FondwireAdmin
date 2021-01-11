import React from 'react'
import Modal from "react-awesome-modal";

const ModalWrapper = (props) => {
    return(
        <Modal visible={props.visible} height={props.height} width={props.width} onClickAway={props.onClickAway}>
            <div className={'modalMainWrapper'}>
            <div className={'closeModalBtn'} onClick={props.onClickAway}>
                <img src={'https://www.flaticon.com/svg/static/icons/svg/1828/1828666.svg'} alt="x"/>
            </div>
            {props.children}
            </div>
        </Modal>
    )
}


export default ModalWrapper
