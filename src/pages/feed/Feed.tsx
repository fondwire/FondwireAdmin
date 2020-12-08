import React, {useEffect, useReducer, useState} from 'react';
import {FeedPageWrapper} from "./Feed-page";
import FeedHeader, {FeedComponent, CreateNew} from "../../components/feedComponents/FeedComponents";
import SearchInput from '../../components/Search-Input/Search-Input';
import reducer from "../../state/RootReducer";
import {db} from "../../firebase";
import Preloader from "../../utils/preloader/preloader";
import {FeedType} from "../dashboard/Dashboard";


function Feed() {
    const [state] = useReducer(reducer, {
        userData: JSON.parse(localStorage.getItem('userData') as string),
    })
    const [pending, setPending] = useState(true)
    const [feeds, setFeeds] = useState<any>([])
    useEffect(()=>{
        const feeds = db.ref('/feeds')
        feeds.once('value', function(snapshot){
            return snapshot.toJSON()
        }).then((data)=>{
            const fObject:any = data.toJSON()
            const feeds = {...fObject.articles, ...fObject.events,...fObject.videos}
            const arr:Array<any> = Object.values(feeds)
                .sort((a:any,b:any)=> b.issueDate - a.issueDate)
                .filter(({uid}:any)=> state.userData && uid === state.userData.uid )
            setFeeds(arr)
            setPending(false)
        })
    },[state.userData])

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
                        ({title,type, issueDate, status}:FeedType)=> {

                            return <FeedComponent
                                key={issueDate}
                                title={title}
                                date={issueDate}
                                type={type}
                                status={status ? status : 'draft'}
                                id={'5'}/>
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
