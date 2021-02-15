import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {TableStyle} from "../table-style/table-style";
import { TableComponentWrapper} from '../feedComponents/Feed-style';
// import {Link} from "react-router-dom";
// import { Action } from '../feedComponents/FeedComponents';
import {useTranslation} from "react-i18next";

const TableWrapper = styled(TableStyle)`
  grid-template-columns: 1fr 0.8fr 1fr 120px 50px;
`

function UsersHeader() {
    const {t} = useTranslation()
    return (
        <TableWrapper>
            <div>{t("assetManagerHomeScreen.name").toUpperCase()}</div>
            <div>{t("assetManagerHomeScreen.email").toUpperCase()}</div>
            <div>{t("assetManagerHomeScreen.company").toUpperCase()}</div>
            <div>{t("assetManagerHomeScreen.status").toUpperCase()}</div>
            {/*<div>{t("assetManagerHomeScreen.edit").toUpperCase()}</div>*/}
            <div/>
        </TableWrapper>
    );
}

export default UsersHeader;


const UserElementWrapper:any = styled(TableWrapper)`
  ${(props:any)=> TableComponentWrapper(props.bg)}
`
type UserElementProps = {
    title: string
    email: string
    company: string
    status: string | boolean
    id: string
    del: (id:string) => void
}
export const UserElement:React.FC<UserElementProps> = ({title, email, company, status}) => {
    const Status = status
    const [background, setBackground] = useState<string>('#a2a2a2')
    useEffect(()=> {
        switch (Status){
            case false:
                return setBackground('#ffe05d')
            case true:
                return setBackground('#51ef63')
            // case 'PENDING':
            //     return setBackground('#ffe05d')
            // case 'SUSPENDED':
            //     return setBackground('#fd5d5d')
            default:
                setBackground('#ffe05d')
        }
    }, [Status])
    return (
        <UserElementWrapper bg={background}>
            <div className={'title'}>{title}</div>
            <div>{email}</div>
            <div>{company}</div>
            <div className={'status'}><span>{Status ? 'Verified' : 'Pending'}</span></div>
            <div>
                {/*<Action>*/}
                {/*    <div>ACTIVATE</div>*/}
                {/*    <div>DEACTIVATE</div>*/}
                {/*    <div className={'delete'} onClick={()=>del(id)}>DELETE</div>*/}
                {/*</Action>*/}
            </div>
        </UserElementWrapper>
    )
}

