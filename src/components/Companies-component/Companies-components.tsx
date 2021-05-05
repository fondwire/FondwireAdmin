import React from 'react';
import styled from "styled-components";
import {TableStyle} from "../table-style/table-style";
import {TableComponentWrapper} from "../feedComponents/Feed-style";
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";
import pencil from '../../images/pencil.png'
import trash from '../../images/delete.png'
import {db} from '../../firebase';
import Swal from "sweetalert2";

const TableWrapper = styled(TableStyle)`
  grid-template-columns: 1fr 0.8fr 2fr  60px;
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
  &:hover  .actions_wrapper>a , &:hover .actions_wrapper>div{
    opacity: 1;
    visibility: visible;
  }
`
type CompaniesElementProps = {
    title: string
    id: string | number
    symbol: string
    manager: string | number
    setPending: (s: boolean) => void
}
export const CompaniesElement:React.FC<CompaniesElementProps> = ({title, symbol, manager, id, setPending}) => {
    const Symbol = symbol.split('').slice(0,3).join('')

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
                db.ref('/assets').child(id.toString()).remove()
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
    return (
        <CompaniesElementWrapper>
            <Link to={`/companies/create-company/${id}`} className={'title'}>{title}</Link>
            <div>{Symbol}</div>
            <div>{manager}</div>
            <div className={'actions_wrapper'}>
                <Link to={`/companies/create-company/${title}?edit=true`}>
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
            </div>
        </CompaniesElementWrapper>
    )
}