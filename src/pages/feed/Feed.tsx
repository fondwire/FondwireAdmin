import React, {useEffect, useReducer, useState} from 'react';
import {FeedPageWrapper} from "./Feed-page";
import FeedHeader, {FeedComponent, CreateNew} from "../../components/feedComponents/FeedComponents";
import SearchInput from '../../components/Search-Input/Search-Input';
import reducer from "../../state/RootReducer";
import Preloader from "../../utils/preloader/preloader";
import {FeedType} from "../dashboard/Dashboard";
import {getData} from "../../App";


function Feed() {
    const [state] = useReducer(reducer, {
        userData: JSON.parse(localStorage.getItem('userData') as string),
    })
    const [pending, setPending] = useState(true)
    const [feeds, setFeeds] = useState<any>([])
    useEffect(()=>{
        getData('/feeds', state, setFeeds, setPending)
    },[state, state.userData, pending])

    if(pending) return <div className={'preloaderWrapper'}><Preloader /></div>
    return (
        <FeedPageWrapper>
            <div className={'header'}>
                <h3>FEEDS</h3>
                <div>
                    <SearchInput />
                    <CreateNew />
                </div>
            </div>
            <div>
                <FeedHeader />
                {
                    feeds.map(
                        ({title,type, issueDate, id,isAssetManagerApproved,isAdminApproved,isPublish}:FeedType)=> {

                            return <FeedComponent
                                isPublish={isPublish}
                                setPending={setPending}
                                key={issueDate}
                                title={title}
                                date={issueDate}
                                type={type}
                                isAssetManagerApprove={isAssetManagerApproved}
                                isAdminApprove={isAdminApproved}
                                id={id}/>
                        })
                }
                {/*<FeedComponent*/}
                {/*    id={2}*/}
                {/*    title={'Tesla had just revealed its plans to join Nikola. Tesla had just revealed its plans to join Nikola.'}*/}
                {/*    date={'Oct 25'}*/}
                {/*    type={'VIDEO'}*/}
                {/*    status={'draft'}*/}
                {/*/>*/}
                {/*<FeedComponent*/}
                {/*    id={2}*/}
                {/*    title={'Tesla had just revealed its plans to join Nikola.'}*/}
                {/*    date={'Oct 25'}*/}
                {/*    type={'ARTICLE'}*/}
                {/*    status={'Active'}*/}
                {/*/>*/}
                {/*<FeedComponent*/}
                {/*    id={2}*/}
                {/*    title={'Tesla had just revealed its plans to join Nikola. Tesla had just revealed its plans to join Nikola.'}*/}
                {/*    date={'Oct 25'}*/}
                {/*    type={'EVENT'}*/}
                {/*    status={'Pending'}*/}
                {/*/>*/}
                {/*<FeedComponent*/}
                {/*    id={2}*/}
                {/*    title={'Tesla had just revealed its plans to join Nikola.'}*/}
                {/*    date={'Oct 25'}*/}
                {/*    type={'PODCAST'}*/}
                {/*    status={'Expired'}*/}
                {/*/>*/}
                {/*<FeedComponent*/}
                {/*    id={2}*/}
                {/*    title={'Tesla had just revealed its plans to join Nikola. Tesla had just revealed its plans to join Nikola.'}*/}
                {/*    date={'Oct 25'}*/}
                {/*    type={'VIDEO'}*/}
                {/*    status={'draft'}*/}
                {/*/>*/}
                {/*<FeedComponent*/}
                {/*    id={2}*/}
                {/*    title={'Tesla had just revealed its plans to join Nikola.'}*/}
                {/*    date={'Oct 25'}*/}
                {/*    type={'ARTICLE'}*/}
                {/*    status={'Active'}*/}
                {/*/>*/}
                {/*<FeedComponent*/}
                {/*    id={2}*/}
                {/*    title={'Tesla had just revealed its plans to join Nikola. Tesla had just revealed its plans to join Nikola.'}*/}
                {/*    date={'Oct 25'}*/}
                {/*    type={'EVENT'}*/}
                {/*    status={'Pending'}*/}
                {/*/>*/}
                {/*<FeedComponent*/}
                {/*    id={2}*/}
                {/*    title={'Tesla had just revealed its plans to join Nikola.'}*/}
                {/*    date={'Oct 25'}*/}
                {/*    type={'PODCAST'}*/}
                {/*    status={'Expired'}*/}
                {/*/>*/}
                {/*<FeedComponent*/}
                {/*    id={2}*/}
                {/*    title={'Tesla had just revealed its plans to join Nikola. Tesla had just revealed its plans to join Nikola.'}*/}
                {/*    date={'Oct 25'}*/}
                {/*    type={'VIDEO'}*/}
                {/*    status={'draft'}*/}
                {/*/>*/}
                {/*<FeedComponent*/}
                {/*    id={2}*/}
                {/*    title={'Tesla had just revealed its plans to join Nikola.'}*/}
                {/*    date={'Oct 25'}*/}
                {/*    type={'ARTICLE'}*/}
                {/*    status={'Active'}*/}
                {/*/>*/}
                {/*<FeedComponent*/}
                {/*    id={2}*/}
                {/*    title={'Tesla had just revealed its plans to join Nikola. Tesla had just revealed its plans to join Nikola.'}*/}
                {/*    date={'Oct 25'}*/}
                {/*    type={'EVENT'}*/}
                {/*    status={'Pending'}*/}
                {/*/>*/}
                {/*<FeedComponent*/}
                {/*    id={2}*/}
                {/*    title={'Tesla had just revealed its plans to join Nikola.'}*/}
                {/*    date={'Oct 25'}*/}
                {/*    type={'PODCAST'}*/}
                {/*    status={'Expired'}*/}
                {/*/>*/}
            </div>
        </FeedPageWrapper>
    );
}

export default Feed;
