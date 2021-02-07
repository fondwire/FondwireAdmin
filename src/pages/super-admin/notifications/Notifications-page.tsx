import React from 'react';
import {DashboardWrapper} from "../../dashboard/dashboard-style";
import styled from "styled-components";
import {TableStyle} from "../../../components/table-style/table-style";
import {TableComponentWrapper} from "../../../components/feedComponents/Feed-style";
import {Link} from "react-router-dom";
// import {Action} from "../../../components/feedComponents/FeedComponents";
import user from '../../../images/user-profile.png'
import {FeedType} from "../../dashboard/Dashboard";
import {useTranslation} from "react-i18next";
// import reducer from "../../../state/RootReducer";
// import {getData} from "../../../App";
// import Preloader from "../../../utils/preloader/preloader";

const TableWrapper = styled(TableStyle)`
  grid-template-columns: 1fr 0.8fr 0.8fr 0.8fr  30px;
`
const CompaniesElementWrapper:any = styled(TableWrapper)`
  ${(props:any)=> TableComponentWrapper(props.bg)}
`
type CompaniesElementProps = {
    title: string
    id: string
    email: string
    company: string | number
    manager: string
    type: string
    notificationId: string
}
export const CompaniesElement:React.FC<CompaniesElementProps> = (
    {title,type, email, company, manager, id, notificationId}
    ) => {
    // console.log(id, notificationId)
    // const onApprove = () => {
    //     db.ref('/feeds').child(type+'s').child(id).child('isAdminApproved').set(true).then(()=>{
    //         db.ref('/notification').child('/feeds').child(type + 's').child(notificationId).remove().then(()=>{
    //             // alert('success set and removed')
    //             // setPending(true)
    //             window.location.href = '/notifications'
    //         })
    //     })
    // }
    // const onDelete = () => {
    //     alert(id)
    // }
    return (
        <CompaniesElementWrapper>
            <Link to={`/notifications/feed/${type}/${id}/${notificationId}`} className={'title'}>{title}</Link>
            <div>
                {email === 'user'
                    ? <div className={'user__image'}><img src={user} alt="User"/> </div>
                    : email }
            </div>
            <div>{company}</div>
            <div>{manager}</div>
            <div>
                {/*<Action>*/}
                {/*    /!*<div onClick={onApprove}>APPROVE</div>*!/*/}
                {/*    <div onClick={onDelete} className={'delete'}>DELETE</div>*/}
                {/*</Action>*/}
            </div>
        </CompaniesElementWrapper>
    )
}
type NotificationsPageProps = {
    data: []
    setPending: (status:boolean) => void
}
const NotificationsPage:React.FC<NotificationsPageProps> = (props) => {
    const {t} = useTranslation()
    return (
        <DashboardWrapper>
            <h3>{t("assetManagerHomeScreen.adminPanel").toUpperCase()}</h3>
            <div className={'title'}>
                <h3>{t("assetManagerHomeScreen.notifications").toUpperCase()}</h3>
            </div>
            <TableWrapper>
                <div>{t("assetManagerHomeScreen.title").toUpperCase()}</div>
                <div>{t("assetManagerHomeScreen.type").toUpperCase()}</div>
                <div>{t("assetManagerHomeScreen.company").toUpperCase()}</div>
                <div>{t("assetManagerHomeScreen.manager").toUpperCase()}</div>
                <div/>
            </TableWrapper>
            {
                props.data.map((item:FeedType) => {
                    if(item.isFeed){
                        return <CompaniesElement notificationId={item.notificationId} type={item.type} key={item.issueDate} id={item.id} title={item.title} manager={item.fullname} company={item.companyName} email={item.type.toUpperCase()} />
                    }else{
                        return <CompaniesElement notificationId={item.notificationId} type={item.type} key={item.id} id={item.id} title={'NEW ACCOUNT REQUEST'} manager={'Aman'} company={5} email={'user'} />
                    }
                })
            }
            {/*<CompaniesElement id={2} title={'NEW ACCOUNT REQUEST'} manager={'Aman'} company={5} email={'user'} />*/}
        </DashboardWrapper>
    );
}

export default NotificationsPage;