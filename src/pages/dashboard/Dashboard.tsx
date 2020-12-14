import React, {useEffect, useReducer, useState} from 'react';
import { DashboardWrapper } from './dashboard-style';
import Analytics from "../../components/analytics/Analytics";
import FeedHeader, {FeedComponent} from "../../components/feedComponents/FeedComponents";
import Preloader from "../../utils/preloader/preloader";
import reducer from '../../state/RootReducer'
import {getData} from "../../App";


export type FeedType = {
    title: string
    teaser: string
    type: string
    uid: string
    eventDate: string
    issueDate: string
    bodyText: string
    status: string
    id: string
}

const Dashboard = () => {
    const [state] = useReducer(reducer, {
        userData: JSON.parse(localStorage.getItem('userData') as string),
    })
    const [pending, setPending] = useState(true)
    const [feeds, setFeeds] = useState<any>([])
    useEffect(()=>{
        getData('/feeds', state, setFeeds, setPending)
    },[state, state.userData])

    if(pending) return <div className={'preloaderWrapper'}><Preloader /></div>
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
            {
                feeds.map(
                    ({title,type, issueDate, status, id}:FeedType)=> {

                        return <FeedComponent
                            key={issueDate}
                            title={title}
                            date={issueDate}
                            type={type}
                            status={status ? status : 'draft'}
                            id={id}/>
                    })
            }
            {/*<FeedComponent*/}
            {/*    id={1}*/}
            {/*    title={'Tesla had just revealed its plans to join Nikola. Tesla had just revealed its plans to join Nikola.'}*/}
            {/*    date={'Oct 25'}*/}
            {/*    type={'VIDEO'}*/}
            {/*    status={'draft'}*/}
            {/*/>*/}
            {/*<FeedComponent*/}
            {/*    id={1}*/}
            {/*    title={'Tesla had just revealed its plans to join Nikola.'}*/}
            {/*    date={'Oct 25'}*/}
            {/*    type={'ARTICLE'}*/}
            {/*    status={'Active'}*/}
            {/*/>*/}
            {/*<FeedComponent*/}
            {/*    id={1}*/}
            {/*    title={'Tesla had just revealed its plans to join Nikola. Tesla had just revealed its plans to join Nikola.'}*/}
            {/*    date={'Oct 25'}*/}
            {/*    type={'EVENT'}*/}
            {/*    status={'Pending'}*/}
            {/*/>*/}
            {/*<FeedComponent*/}
            {/*    id={1}*/}
            {/*    title={'Tesla had just revealed its plans to join Nikola.'}*/}
            {/*    date={'Oct 25'}*/}
            {/*    type={'PODCAST'}*/}
            {/*    status={'Expired'}*/}
            {/*/>*/}
        </DashboardWrapper>
    );
}

export default Dashboard;