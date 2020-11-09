import React from 'react';
import { DashboardWrapper } from './dashboard-style';
import Analytics from "../../components/analytics/Analytics";
import FeedHeader, {FeedComponent} from "../../components/feedComponents/FeedComponents";

const Dashboard = () => {
    return (
        <DashboardWrapper>
            <h3>WELCOME, JOHN</h3>
            <div className={'title'}>
                <h3>ANALYTICS</h3>
            </div>
            <Analytics />
            <div className={'title feedTitle'}>
                <h3>FEEDS</h3>
            </div>
            <FeedHeader />
            <FeedComponent
                title={'Tesla had just revealed its plans to join Nikola. Tesla had just revealed its plans to join Nikola.'}
                date={'Oct 25'}
                type={'VIDEO'}
                status={'draft'}
            />
            <FeedComponent
                title={'Tesla had just revealed its plans to join Nikola.'}
                date={'Oct 25'}
                type={'ARTICLE'}
                status={'Active'}
            />
            <FeedComponent
                title={'Tesla had just revealed its plans to join Nikola. Tesla had just revealed its plans to join Nikola.'}
                date={'Oct 25'}
                type={'EVENT'}
                status={'Pending'}
            />
            <FeedComponent
                title={'Tesla had just revealed its plans to join Nikola.'}
                date={'Oct 25'}
                type={'PODCAST'}
                status={'Expired'}
            />
        </DashboardWrapper>
    );
}

export default Dashboard;