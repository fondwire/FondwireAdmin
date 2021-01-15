import React, {useEffect, useRef, useState} from 'react';
import {FeedWrapper, FeedComponentWrapper, ActionWrapper, CreateNewWrapper, FeedModal} from './Feed-style';
import {Link} from 'react-router-dom';
import {db} from "../../firebase";

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
        db.ref('/feeds').child(type + 's').child(id.toString()).remove()
            .then((res) => {
                console.log(res)
                setPending(true)
            })
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
            <div>
                <Action>
                    <div onClick={onDelete} className={'delete'}>DELETE</div>
                </Action>
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