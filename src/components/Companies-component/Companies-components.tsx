import React from 'react';
import styled from "styled-components";
import {TableStyle} from "../table-style/table-style";
import {TableComponentWrapper} from "../feedComponents/Feed-style";
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";
// import {Action} from "../feedComponents/FeedComponents";


const TableWrapper = styled(TableStyle)`
  grid-template-columns: 1fr 0.8fr 2fr  30px;
`

function CompaniesTableHeader() {
    const {t} = useTranslation()
    return (
        <TableWrapper>
            <div>{t("assetManagerHomeScreen.name").toUpperCase()}</div>
            <div>{t("assetManagerHomeScreen.symbol").toUpperCase()}</div>
            <div>{t("assetManagerHomeScreen.managers").toUpperCase()}</div>
            <div/>
        </TableWrapper>
    );
}

export default CompaniesTableHeader;


const CompaniesElementWrapper:any = styled(TableWrapper)`
  ${(props:any)=> TableComponentWrapper(props.bg)}
`
type CompaniesElementProps = {
    title: string
    id: string | number
    symbol: string
    manager: string | number
}
export const CompaniesElement:React.FC<CompaniesElementProps> = ({title, symbol, manager, id}) => {
    const Symbol = symbol.split('').slice(0,3).join('')
    return (
        <CompaniesElementWrapper>
            <Link to={`/companies/create-company/${id}`} className={'title'}>{title}</Link>
            <div>{Symbol}</div>
            <div>{manager}</div>
            <div>
                {/*<Action/>*/}
            </div>
        </CompaniesElementWrapper>
    )
}