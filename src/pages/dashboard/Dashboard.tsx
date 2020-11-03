import React from 'react';
import { DashboardWrapper } from './dashboard-style';
import Analytics from "../../components/analytics/Analytics";

const Dashboard = () => {
    return (
        <DashboardWrapper>
            <h3>WELCOME, JOHN</h3>
            <div className={'title'}>
                <h3>ANALYTICS</h3>
            </div>
            <Analytics />
            <div className={'title'}>
                <h3>FEEDS</h3>
            </div>
        </DashboardWrapper>
    );
}

export default Dashboard;