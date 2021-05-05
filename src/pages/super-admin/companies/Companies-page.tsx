import React, {useEffect, useReducer, useState} from 'react';
import { DashboardWrapper } from '../../dashboard/dashboard-style';
import CompaniesTableHeader, { CompaniesElement } from "../../../components/Companies-component/Companies-components";
import reducer from "../../../state/RootReducer";
import {getData} from "../../../App";
import Preloader from "../../../utils/preloader/preloader";
import { CreateNewWrapper } from '../../../components/feedComponents/Feed-style';
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";

interface CompanyType {
    name: string
    managers: Object
    id: string

}

function CompaniesPage() {
    const [state] = useReducer(reducer, {
        userData: JSON.parse(localStorage.getItem('userData') as string),
    })
    const {t} = useTranslation()
    const [pending, setPending] = useState(true)
    const [companies, setCompanies] = useState<any>([])
    useEffect(()=>{
        getData('/assets', state, setCompanies, setPending)
    }, [state, state.userData, pending])

    if(pending) return <div className={'preloaderWrapper'}><Preloader /></div>
    return (
        <DashboardWrapper>
            <h3>{t("assetManagerHomeScreen.adminPanel").toUpperCase()}</h3>
            <div className={'title'}>
                <h3>{t("assetManagerHomeScreen.companies").toUpperCase()}</h3>
                <CreateNewWrapper>
                    <span>{t("assetManagerHomeScreen.createNew").toUpperCase()}</span>
                    <Link to={'/companies/create-company'} className={'plus'}>
                        +
                    </Link>
                </CreateNewWrapper>
            </div>
            <CompaniesTableHeader />
            {
                companies.map((company:CompanyType)=> <CompaniesElement
                    key={company.name}
                    title={company.name}
                    id={company.id}
                    symbol={company.name}
                    manager={Object.keys(company.managers ? company.managers : {}).length}
                    setPending={setPending}
                />)
            }
        </DashboardWrapper>
    );
}

export default CompaniesPage;