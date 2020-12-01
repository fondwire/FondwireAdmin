import React from 'react';
import {DashboardWrapper} from "../../dashboard/dashboard-style";
import styled from "styled-components";
import {TableStyle} from "../../../components/table-style/table-style";
import {TableComponentWrapper} from "../../../components/feedComponents/Feed-style";
import {Link} from "react-router-dom";
import {Action} from "../../../components/feedComponents/FeedComponents";

const TableWrapper = styled(TableStyle)`
  grid-template-columns: 1fr 0.8fr 2fr  80px;
`
const CompaniesElementWrapper:any = styled(TableWrapper)`
  ${(props:any)=> TableComponentWrapper(props.bg)}
`
type CompaniesElementProps = {
    title: string
    id: string | number
    email: string
    company: string | number
}
export const CompaniesElement:React.FC<CompaniesElementProps> = ({title, email, company}) => {
    return (
        <CompaniesElementWrapper>
            <Link to={`#`}>{title}</Link>
            <div>{email}</div>
            <div>{company}</div>
            <div><Action/></div>
        </CompaniesElementWrapper>
    )
}

function NotificationsPage() {
    return (
        <DashboardWrapper>
            <h3>WELCOME TO ADMIN PANEL</h3>
            <div className={'title'}>
                <h3>NOTIFICATIONS</h3>
            </div>
            <TableWrapper>
                <div>TITLE</div>
                <div>EMAIL</div>
                <div>COMPANY</div>
                <div>ACTIONS</div>
            </TableWrapper>
            <CompaniesElement id={2} title={'Asylbekov Amanbek'} company={5} email={'VNGFNL'} />
            <CompaniesElement id={2} title={'Asylbekov Amanbek'} company={5} email={'VNGFNL'} />
            <CompaniesElement id={2} title={'Asylbekov Amanbek'} company={5} email={'VNGFNL'} />
        </DashboardWrapper>
    );
}

export default NotificationsPage;