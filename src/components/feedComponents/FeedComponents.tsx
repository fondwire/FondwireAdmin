import React, {useEffect, useRef, useState} from 'react';
import {FeedWrapper, FeedComponentWrapper, ActionWrapper, CreateNewWrapper, FeedModal} from './Feed-style';
import {Link} from 'react-router-dom';
import {db} from "../../firebase";
import Swal from "sweetalert2";

const FeedHeader = () => {
    return (
        <FeedWrapper>
            <div>TITLE</div>
            <div>CREATION DATE</div>
            <div>TYPE</div>
            {/*<div>STATUS</div>*/}
            <div>VIEWS</div>
            <div/>
        </FeedWrapper>
    );
};
export default FeedHeader;

export type FeedComponentProps = {
    title: string
    date: string
    type: string
    id: string | number
    issueDate?: string
    isAdminApprove: boolean
    isAssetManagerApprove: boolean
    isPublish: boolean
    setPending: (status:boolean)=>void
}
export const FeedComponent: React.FC<FeedComponentProps> = ({
                                                                isAdminApprove,
                                                                isAssetManagerApprove,
                                                                title,
                                                                date,
                                                                type,
                                                                id,
                                                                isPublish,
                                                                setPending
                                                            }) => {
    // const Status = status.toUpperCase()
    let Status = 'DRAFT'
    if(!isPublish){
        Status = 'DRAFT'
    }else if(isAdminApprove && isAssetManagerApprove){
        Status = 'PUBLISHED'
    }else if(isAdminApprove){
        Status = 'APPROVED'
    }else {
        Status = 'SUBMITTED'
    }
    const Type = type.toUpperCase()
    const Time = new Date(date).toLocaleDateString()
    const [background, setBackground] = useState<string>('#a2a2a2')

    const onDelete = () => {
        Swal.fire({
            showConfirmButton: false,
            title: `<div class="modalTitle fz30" style="margin: 35px 0;"> DELETE REQUEST </div>`,
            html: `<div>
                        <div class="medium black fz21">Do you really want to delete this post?</div>
                        <br>
                        <div class="medium black fz21">This process cannot be undone.</div>
                        <div class="modal-two-buttons-wrapper" style="margin: 35px 0;">
                            <button id="noDelete" class="modal-submit">NO, KEEP IT</button>
                            <button id="yesDelete" class="modal-submit">YES, DELETE</button>
                        </div>
                  </div>`,
        }).then((res)=>{
            if(res.isConfirmed){
                db.ref('/feeds').child(type + 's').child(id.toString()).remove()
                    .then(() => {
                        setPending(true)
                    })
            }
        })
        const confirmBtn = document.getElementById("yesDelete")
        confirmBtn?.addEventListener('click', ()=> Swal.clickConfirm())
        const deleteBtn = document.getElementById("noDelete")
        deleteBtn?.addEventListener('click', ()=> Swal.clickCancel())
    }
    useEffect(() => {
        switch (Status) {
            case 'DRAFT':
                return setBackground('#a2a2a2')
            case 'PUBLISHED':
                return setBackground('#000000')
            case 'APPROVED':
                return setBackground('#51ef63')
            case 'SUBMITTED':
                return setBackground('#ffe05d')
            default:
                setBackground('#a2a2a2')
        }
    }, [Status])
    return (
        <FeedComponentWrapper bg={background}>
            <Link to={`feed/create/${Type.toLowerCase()}/${id}`} className={'title'}>{title}</Link>
            <div>{Time}</div>
            <div>{Type}</div>
            {/*<div className={'status'}><span>{Status}</span></div>*/}
            <div>1.170</div>
            <div className={'action_wrapper'}>
                <Link to={`feed/create/${Type.toLowerCase()}/${id}`} className={'title'}>
                    <img  src="https://www.flaticon.com/svg/vstatic/svg/1250/1250615.svg?token=exp=1611172482~hmac=411827c809bb0ede7a39edb12840a3c1" alt="edit   "/>
                </Link>
                <div>
                    <img onClick={onDelete} src="https://www.flaticon.com/svg/vstatic/svg/1214/1214428.svg?token=exp=1611172701~hmac=c1fcc2b476a9a8f0e553c94f581a3012" alt="delete"/>
                </div>
                {/*<Action>*/}
                {/*    <div onClick={onDelete} className={'delete'}>DELETE</div>*/}
                {/*</Action>*/}
            </div>
        </FeedComponentWrapper>
    )
}

export const Action: React.FC = (props) => {
    const [opacity, setOpacity] = useState(0)
    const wrapperRef: any = useRef(null);
    useEffect(() => {
        function handleClickOutside(event: any) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                // alert("You clicked outside of me!");
                setOpacity(0)
            }
        }

        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [wrapperRef]);
    return (
        <span ref={wrapperRef} className={'pos-relative action__wrapper'}>
            <ActionWrapper onClick={() => setOpacity(1)}>
                <span/>
                <span/>
                <span/>
            </ActionWrapper>
            <FeedModal opacity={opacity}>
                {
                    props.children
                }
                {/*<div className={'delete'}>DELETE</div>*/}
            </FeedModal>
        </span>
    )
}

export const CreateNew = () => {
    return (
        <CreateNewWrapper>
            <span>CREATE NEW</span>
            <div className={'plus'}>
                +
                <div className={'modal'}>
                    <div><Link to={'/feed/create/video'}>video</Link></div>
                    <div><Link to={'/feed/create/event'}>event</Link></div>
                    <div><Link to={'/feed/create/article'}>article</Link></div>
                    {/*<div><Link to={'/feed/create/podcast'}>podcast</Link></div>*/}
                </div>
            </div>
        </CreateNewWrapper>
    )
}