import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {TableStyle} from "../table-style/table-style";
import { TableComponentWrapper} from '../feedComponents/Feed-style';
import {Link} from "react-router-dom";
import { Action } from '../feedComponents/FeedComponents';

const TableWrapper = styled(TableStyle)`
  grid-template-columns: 1fr 0.8fr 1fr 120px 30px;
`

function UsersHeader() {
    return (
        <TableWrapper>
            <div>NAME</div>
            <div>EMAIL</div>
            <div>COMPANY</div>
            <div>STATUS</div>
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
    id: string | number
}
export const UserElement:React.FC<UserElementProps> = ({id,title, email, company, status}) => {
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
            <Link to={`user/${id}`} className={'title'}>{title}</Link>
            <div>{email}</div>
            <div>{company}</div>
            <div className={'status'}><span>{Status ? 'Verified' : 'Pending'}</span></div>
            <div>
                <Action>
                    <div>ACTIVATE</div>
                    <div>DEACTIVATE</div>
                    <div className={'delete'}>DELETE</div>
                </Action>
            </div>
        </UserElementWrapper>
    )
}

