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
    const [pend, setPend] = useState(false)
    const [search, setSearch] = useState('')
    const [feeds, setFeeds] = useState<any>([])
    const [data, setData] = useState<any>([])

    useEffect(() => {
        getData('/feeds', state, (arr)=> {
            setFeeds(arr)
            setData(arr)
        }, () => {
            setPending(false)
            setPend(false)
        })
    }, [state, state.userData, pending])
    useEffect(() => {
        setPend(true)
        let arr: any = []
        if (search.length) {
            feeds.forEach((childSnapshot: any, index: any) => {
                if (childSnapshot.uid === state.userData.uid) {
                    let str = childSnapshot.title.slice(0, search.length)
                    if (str.toLowerCase() === search.toLowerCase()) {
                        arr.push(childSnapshot)
                    }
                }
                if (index < feeds.length) {
                    setData([...arr])
                    setPend(false)
                }
            })
        } else {
            getData('/feeds', state, (arr)=> {
                // setFeeds(arr)
                setData(arr)
            }, () => {
                setPending(false)
                setPend(false)
            })
        }
    }, [feeds, search, state])

    const sortFeeds = (key: string, num: number) => {
        console.log(key, num)
        let newArr = num === 1 ? data.sort(function (a:any, b:any) {
            if (a[key] > b[key]) {
                return 1;
            }
            if (a[key] < b[key]) {
                return -1;
            }
            return 0;
        }) : data.sort(function (a:any, b:any) {
            if (a[key] < b[key]) {
                return 1;
            }
            if (a[key] > b[key]) {
                return -1;
            }
            return 0;
        })
        setData([...newArr])
    }
    if (pending) return <div className={'preloaderWrapper'}><Preloader/></div>
    return (
        <FeedPageWrapper>
            <div className={'header'}>
                <h3>FEEDS</h3>
                <div>
                    <SearchInput value={search} onChange={setSearch}/>
                    <CreateNew/>
                </div>
            </div>
            <div>
                <FeedHeader sortFC={sortFeeds} withSort={true}/>
                {
                    pend
                        ? <Preloader/>
                        : data.map(
                        ({title, type, issueDate, id, isAssetManagerApproved, isAdminApproved, isPublish}: FeedType) => {

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
            </div>
        </FeedPageWrapper>
    );
}

export default Feed;
