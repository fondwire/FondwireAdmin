import React, {useEffect, useReducer, useState} from 'react';
import { DashboardWrapper } from '../../dashboard/dashboard-style';
import CompaniesTableHeader, { CompaniesElement } from "../../../components/Companies-component/Companies-components";
import reducer from "../../../state/RootReducer";
import {getData} from "../../../App";
import Preloader from "../../../utils/preloader/preloader";
import { CreateNewWrapper } from '../../../components/feedComponents/Feed-style';
import {Link} from "react-router-dom";

interface CompanyType {
    name: string
    managers: Object
    id: string

}

function CompaniesPage() {
    const [state] = useReducer(reducer, {
        userData: JSON.parse(localStorage.getItem('userData') as string),
    })
    const [pending, setPending] = useState(true)
    const [companies, setCompanies] = useState<any>([])
    useEffect(()=>{
        getData('/assets', state, setCompanies, setPending)
    }, [state, state.userData])

    if(pending) return <div className={'preloaderWrapper'}><Preloader /></div>
    return (
        <DashboardWrapper>
            <h3>ADMIN PANEL</h3>
            <div className={'title'}>
                <h3>COMPANIES</h3>
                <CreateNewWrapper>
                    <span>CREATE NEW</span>
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
                />)
            }
        </DashboardWrapper>
    );
}

export default CompaniesPage;