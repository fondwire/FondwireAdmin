import React, {useEffect, useReducer, useState} from 'react';
import { DashboardWrapper } from './dashboard-style';
import Analytics from "../../components/analytics/Analytics";
import FeedHeader, {FeedComponent} from "../../components/feedComponents/FeedComponents";
import Preloader from "../../utils/preloader/preloader";
import reducer from '../../state/RootReducer'
import {getData} from "../../App";
import {UserType} from "../../components/feedComponents/feed";
import {useTranslation} from "react-i18next";


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
    notificationId: string
    isAdminApproved: boolean
    isAssetManagerApproved: boolean
    isFeed: boolean
    isPublish: boolean
    fullname: string
    companyName: string
    views: number
}

type DashboardPropsType = {
    user: UserType
}
const Dashboard:React.FC<DashboardPropsType> = ({user}) => {
    const [state] = useReducer(reducer, {
        userData: JSON.parse(localStorage.getItem('userData') as string),
    })
    const {t} = useTranslation();
    const [pending, setPending] = useState(true)
    const [feeds, setFeeds] = useState<any>([])
    const [feedsData, setFeedsData] = useState<any>([])
    useEffect(()=>{
        let arr = feeds.sort((a:FeedType , b:FeedType) => b.views - a.views).slice(0, 5)
        setFeedsData(arr)
    }, [feeds])
    useEffect(()=>{
        getData('/feeds', state, setFeeds, setPending)
    },[state, state.userData, pending])

    if(pending) return <div className={'preloaderWrapper'}><Preloader /></div>
    return (
        <DashboardWrapper>
            <h3>{t("assetManagerHomeScreen.welcomeLabel").toUpperCase()}{user && user.fullname ? `, ${user.fullname.toUpperCase()}` : ''}</h3>
            <div className={'title'}>
                <h3>{t("assetManagerHomeScreen.analyticsLabel").toUpperCase()}</h3>
            </div>
            <Analytics />
            <div className={'title feedTitle'}>
                <h3>{t("assetManagerHomeScreen.topContent")}</h3>
            </div>
            <FeedHeader />
            {
                feedsData.map(
                    ({title,type, issueDate, id, isAssetManagerApproved, isAdminApproved, isPublish, views}:FeedType)=> {
                        return <FeedComponent
                            views={views}
                            isPublish={isPublish}
                            setPending={setPending}
                            key={issueDate}
                            isAssetManagerApprove={isAssetManagerApproved}
                            isAdminApprove={isAdminApproved}
                            title={title}
                            date={issueDate}
                            type={type}
                            // status={status ? status : 'draft'}
                            id={id}
                        />
                    })
            }
        </DashboardWrapper>
    );
}

export default Dashboard;