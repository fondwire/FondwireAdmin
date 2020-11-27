import React from 'react';
import { DashboardWrapper } from '../../dashboard/dashboard-style';
import CompaniesTableHeader, { CompaniesElement } from "../../../components/Companies-component/Companies-components";

function CompaniesPage() {
    return (
        <DashboardWrapper>
            <h3>WELCOME TO ADMIN PANEL</h3>
            <div className={'title'}>
                <h3>COMPANIES</h3>
            </div>
            <CompaniesTableHeader />
            <CompaniesElement id={2} title={'Asylbekov Amanbek'} manager={5} symbol={'VNGFNL'} />
            <CompaniesElement id={2} title={'Asylbekov Amanbek'} manager={5} symbol={'VNGFNL'} />
            <CompaniesElement id={2} title={'Asylbekov Amanbek'} manager={5} symbol={'VNGFNL'} />
        </DashboardWrapper>
    );
}

export default CompaniesPage;