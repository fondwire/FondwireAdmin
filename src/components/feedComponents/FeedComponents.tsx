import React, {useEffect, useRef, useState} from 'react';
import {FeedWrapper, FeedComponentWrapper, ActionWrapper, CreateNewWrapper, FeedModal, SortButton} from './Feed-style';
import {Link} from 'react-router-dom';
import {db} from "../../firebase";
import Swal from "sweetalert2";
import pencil from '../../images/pencil.png'
import trash from '../../images/delete.png'
import {useTranslation} from "react-i18next";

const Sort = ({active, link}: any) => {
    return <SortButton count={active.link === link ? active.count : ''}>
        <div className={'first'}/>
        <div className={'second'}/>
    </SortButton>
}

const FeedHeader: React.FC<{
    withSort?: boolean,
    sortFC?: (a: string, num: number, option?: string) => void,
    isAdmin?: boolean,
    companies?: any
}> = (props) => {
    const [active, setActive] = useState({
        link: '',
        count: 0,
    })
    const {t} = useTranslation()
    const sorting = (type: string, option?:string) => {
        if (props.sortFC) {
            let count
            if(active.link !== type){
                count = 1
            }else if(active.count === 0) {
                count = 1
            }else if(active.count === 1){
                count = 2
            }else if(active.count === 2){
                count = 1
            }else{
                count = 0
            }
            setActive({
                link: type,
                count: count
            })
            props.sortFC(type, count, option)
        }
    }

    return (
        <FeedWrapper withSort={props.withSort} isAdmin={props.isAdmin}>
            <div className={'header'} onClick={() => sorting('title')}>
                {t("assetManagerHomeScreen.title").toUpperCase()}
                {props.withSort && <Sort active={active} link={'title'}/>}
            </div>
            <div className={'header'} onClick={() => sorting('issueDate')}>
                {t("assetManagerHomeScreen.date")}
                {props.withSort && <Sort active={active} link={'issueDate'}/>}
            </div>
            <div className={'header'} onClick={() => sorting('type')}>
                {t("assetManagerHomeScreen.type").toUpperCase()}
                {props.withSort && <Sort active={active} link={'type'}/>}
            </div>
            {props.isAdmin && <div className={'header'}>
                <select className={'select-sort'} onChange={(e)=> sorting('companyName', e.target.value)}>
                    <option value="all">{t("assetManagerHomeScreen.allCompanies").toUpperCase()}</option>
                    {
                        props.companies.map((item:{name: string, id: string})=> <option value={item.name}>{item.name}</option> )
                    }
                </select>
            </div>}
            {props.withSort && <div className={'header'}>
                {/*STATUS*/}
                <select className={'select-sort'} onChange={(e)=> sorting('status', e.target.value)}>
                    <option value="all">{t("assetManagerHomeScreen.allStatus").toUpperCase()}</option>
                    {!props.isAdmin && <option value="draft">DRAFT</option>}
                    <option value="submitted">SUBMITTED</option>
                    <option value="approved">APPROVED</option>
                    <option value="published">PUBLISHED</option>
                </select>
                {/*{props.withSort && <Sort active={active} link={'status'}/>}*/}
            </div>}
            {!props.isAdmin && <div className={'header'} onClick={() => sorting('views')}>
                {t("assetManagerHomeScreen.views")}
                {props.withSort && <Sort active={active} link={'views'}/>}
            </div>}
            <div>{t("assetManagerHomeScreen.edit")}</div>
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
    setPending: (status: boolean) => void
    isAdmin?: boolean
    withSort?: boolean
    companyName?: string
    views: number
}
export const FeedComponent: React.FC<FeedComponentProps> = ({
                                                                isAdminApprove,
                                                                isAssetManagerApprove,
                                                                title,
                                                                date,
                                                                type,
                                                                id,
                                                                isPublish,
                                                                setPending,
                                                                isAdmin,
                                                                withSort,
                                                                companyName,
                                                                views
                                                            }) => {
    // const Status = status.toUpperCase()
    let Status = 'DRAFT'
    if (!isPublish) {
        Status = 'DRAFT'
    } else if (isAdminApprove && isAssetManagerApprove) {
        Status = 'PUBLISHED'
    } else if (isAdminApprove) {
        Status = 'APPROVED'
    } else {
        Status = 'SUBMITTED'
    }
    const Type = type.toUpperCase()
    const Time = new Date(date)
    const [background, setBackground] = useState<string>('#a2a2a2')
    const addZero = (date:number) => {
        let newDate = date.toString()
        if(newDate.length > 1) return date
        return '0' + newDate
    }
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
        }).then((res) => {
            if (res.isConfirmed) {
                db.ref('/feeds').child(type + 's').child(id.toString()).remove()
                    .then(() => {
                        setPending(true)
                    })
            }
        })
        const confirmBtn = document.getElementById("yesDelete")
        confirmBtn?.addEventListener('click', () => Swal.clickConfirm())
        const deleteBtn = document.getElementById("noDelete")
        deleteBtn?.addEventListener('click', () => Swal.clickCancel())
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
    const issueDate = `${addZero(Time.getDate())}.${addZero(Time.getMonth() + 1)}.${Time.getFullYear()}`
    return (
        <FeedComponentWrapper withSort={withSort} isAdmin={isAdmin} bg={background}>
            <Link to={`${isAdmin ? 'content' : 'feed/create'}/${Type.toLowerCase()}/${id}`} className={'title'}>{title}</Link>
            <div>{issueDate}</div>
            <div>{Type}</div>
            {isAdmin && <div>{companyName ? companyName : ' '}</div>}
            {withSort && <div className={'status'}><span>{Status}</span></div>}
            {!isAdmin && <div>{views}</div>}
            <div className={'actions_wrapper'}>
                <Link to={`${isAdmin ? 'content' : 'feed/create'}/${Type.toLowerCase()}/${id}`}>
                    <img
                        title={'edit'}
                        src={pencil}
                        alt="edit"/>
                </Link>
                <div>
                    <img onClick={onDelete}
                         title={'delete'}
                         src={trash}
                         alt="delete"/>
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
        document.addEventListener("mouseover", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mouseover", handleClickOutside);
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
    const {t} = useTranslation()
    return (
        <CreateNewWrapper>
            <span>{t("assetManagerHomeScreen.createNew").toUpperCase()}</span>
            <div className={'plus'}>
                +
                <div className={'modal'}>
                    <div><Link to={'/feed/create/video'}>{t("assetManagerHomeScreen.video")}</Link></div>
                    <div><Link to={'/feed/create/event'}>{t("assetManagerHomeScreen.event")}</Link></div>
                    <div><Link to={'/feed/create/article'}>{t("assetManagerHomeScreen.article")}</Link></div>
                    {/*<div><Link to={'/feed/create/podcast'}>podcast</Link></div>*/}
                </div>
            </div>
        </CreateNewWrapper>
    )
}