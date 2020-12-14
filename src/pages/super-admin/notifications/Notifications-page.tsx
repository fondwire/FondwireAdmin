import React from 'react';
import {DashboardWrapper} from "../../dashboard/dashboard-style";
import styled from "styled-components";
import {TableStyle} from "../../../components/table-style/table-style";
import {TableComponentWrapper} from "../../../components/feedComponents/Feed-style";
import {Link} from "react-router-dom";
import {Action} from "../../../components/feedComponents/FeedComponents";
import user from '../../../images/user-profile.png'
// import reducer from "../../../state/RootReducer";
// import {getData} from "../../../App";
// import Preloader from "../../../utils/preloader/preloader";

const TableWrapper = styled(TableStyle)`
  grid-template-columns: 1fr 0.8fr 0.8fr 0.8fr  80px;
`
const CompaniesElementWrapper:any = styled(TableWrapper)`
  ${(props:any)=> TableComponentWrapper(props.bg)}
`
type CompaniesElementProps = {
    title: string
    id: string | number
    email: string
    company: string | number
    manager: string
}
export const CompaniesElement:React.FC<CompaniesElementProps> = ({title, email, company, manager}) => {
    return (
        <CompaniesElementWrapper>
            <Link to={`#`} className={'title'}>{title}</Link>
            <div>
                {email === 'user'
                    ? <div className={'user__image'}><img src={user} alt="User"/> </div>
                    : email }
            </div>
            <div>{company}</div>
            <div>{manager}</div>
            <div><Action/></div>
        </CompaniesElementWrapper>
    )
}
type NotificationsPageProps = {
    data: []
}
const NotificationsPage:React.FC<NotificationsPageProps> = (props) => {
    console.log(props.data)
    return (
        <DashboardWrapper>
            <h3>WELCOME TO ADMIN PANEL</h3>
            <div className={'title'}>
                <h3>NOTIFICATIONS</h3>
            </div>
            <TableWrapper>
                <div>TITLE</div>
                <div>TYPE</div>
                <div>COMPANY</div>
                <div>MANAGER</div>
                <div>ACTIONS</div>
            </TableWrapper>
            {
                props.data.map((item:any) => {
                    if(item.isFeed){
                        return <CompaniesElement key={item.issueDate} id={2} title={'NEW FEED'} manager={'Aman'} company={5} email={item.type.toUpperCase()} />
                    }else{
                        return <CompaniesElement key={item.email} id={2} title={'NEW ACCOUNT REQUEST'} manager={'Aman'} company={5} email={'user'} />
                    }
                })
            }
            {/*<CompaniesElement id={2} title={'NEW ACCOUNT REQUEST'} manager={'Aman'} company={5} email={'user'} />*/}
        </DashboardWrapper>
    );
}

export default NotificationsPage;