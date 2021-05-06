import React, {useEffect, useReducer, useState} from 'react';
import {FeedPageWrapper} from "./Feed-page";
import FeedHeader, {FeedComponent, CreateNew} from "../../components/feedComponents/FeedComponents";
import SearchInput from '../../components/Search-Input/Search-Input';
import reducer from "../../state/RootReducer";
import Preloader from "../../utils/preloader/preloader";
import {FeedType} from "../dashboard/Dashboard";
import {getData} from "../../App";
import {useTranslation} from "react-i18next";


const Feed: React.FC<{ isAdmin?: boolean, companies?: any }> = (props) => {
    const [state] = useReducer(reducer, {
        userData: JSON.parse(localStorage.getItem('userData') as string),
    })
    const {t} = useTranslation()
    const [pending, setPending] = useState(true)
    const [pend, setPend] = useState(false)
    const [search, setSearch] = useState('')
    const [feeds, setFeeds] = useState<any>([])
    const [data, setData] = useState<any>([])
    const [sortData, setSortData] = useState(feeds)

    useEffect(() => {
        setSortData([...feeds])
    }, [feeds])
    useEffect(() => {
        getData('/feeds', state, (arr) => {
            setFeeds(arr)
            setData(arr)
        }, () => {
            setPending(false)
            setPend(false)
        }, props.isAdmin)
    }, [state, state.userData, pending, props.isAdmin])

    useEffect(() => {
        setPend(true)
        let arr: any = []
        if (search.length) {
            sortData.forEach((childSnapshot: any, index: any) => {
                // if (childSnapshot.uid === state.userData.uid) {
                let str = childSnapshot.title.slice(0, search.length)
                if (str.toLowerCase() === search.toLowerCase()) {
                    arr.push(childSnapshot)
                }
                // }
                if (index < sortData.length) {
                    setData([...arr])
                    setPend(false)
                }
            })
        } else {
            setData([...sortData])
            setPending(false)
            setPend(false)
            // getData('/feeds', state, (arr)=> {
            //     // setFeeds(arr)
            //     setData(arr)
            // }, () => {
            //     setPending(false)
            //     setPend(false)
            // }, props.isAdmin)
        }
    }, [sortData, search, state, props.isAdmin])
    // let sortState = {
    //     status: 'all',
    //     company: 'all'
    // }
    const [sortState, setSortState] = useState({
        status: 'all',
        company: 'all'
    })
    const sortStatus = (i: any, option: any) => {
        let opt = option?.toLocaleLowerCase()
        if(opt === 'all') return i;
        if(opt === 'draft') return !i.isPublish
        if(opt === 'submitted') return i.isPublish && !i.isAdminApproved;
        if(opt === 'approved') return i.isAdminApproved && !i.isAssetManagerApproved;
        if(opt === 'published') return i.isPublish && i.isAssetManagerApproved;
        return i
        // return opt === 'all' ? i
        //     : opt === 'draft'
        //         ? !i.isPublish
        //         : opt === 'submitted'
        //             ? i.isPublish && !i.isAdminApproved
        //             : opt === 'approved'
        //                 ? i.isAdminApproved && !i.isAssetManagerApproved
        //                 : i.isAssetManagerApproved
    }
    const sortCompany = (a: any, key: any, option: any) => (typeof a[key] === 'string') && a[key].toLowerCase() === option.toLowerCase()
    const sortFeeds = (key: string, num: number, option?: string) => {
        // console.log(key, num, option)
        let newArr
        if (key === 'companyName') {
            setSortState({...sortState, company: option ? option : 'all'})
        } else if (key === 'status') {
            setSortState({...sortState, status: option ? option : 'all'})
        }
        if (key === 'status') {
            if (sortState.company !== 'all' && option !== 'all') {
                newArr = sortData.filter((i: any) => sortStatus(i, option))
            } else if (sortState.status !== 'all' && sortState.company !== 'all') {
                newArr = feeds.filter((a: any) => sortCompany(a, 'companyName', sortState.company)).filter((i: any) => sortStatus(i, option))
            } else {
                newArr = feeds.filter((i: any) => sortStatus(i, option))
            }
        } else if (option && option !== 'all') {
            if (sortState.status !== 'all' && option !== 'all') {
                newArr = feeds.filter((i: any) => sortStatus(i, sortState.status)).filter((a: any) => sortCompany(a, key, option))
            } else if (sortState.company !== 'all' && sortState.status !== 'all') {
                newArr = feeds.filter((i: any) => sortStatus(i, sortState.status)).filter((a: any) => sortCompany(a, key, option))
            } else {
                newArr = feeds.filter((a: any) => sortCompany(a, key, option))
            }
        } else if (option === 'all') {
            if (sortState.status === 'all' && option === 'all') {
                newArr = [...feeds]
            }else if(sortState.status === 'all' && sortState.company !== 'all'){
                newArr = feeds.filter((a: any) => sortCompany(a, 'companyName', sortState.company))
            }else{
                newArr = feeds.filter((i: any) => sortStatus(i, sortState.status))
            }
        } else {
            newArr = num === 1 ? data.sort(function (a: any, b: any) {
                if (a[key] > b[key]) {
                    return 1;
                }
                if (a[key] < b[key]) {
                    return -1;
                }
                return 0;
            }) : data.sort(function (a: any, b: any) {
                if (a[key] < b[key]) {
                    return 1;
                }
                if (a[key] > b[key]) {
                    return -1;
                }
                return 0;
            })
        }
        setSortData([...newArr])
    }
    useEffect(() => {
        setData([...sortData])
    }, [sortData])
    if (pending) return <div className={'preloaderWrapper'}><Preloader/></div>
    return (
        <FeedPageWrapper>
            <div className={'header'}>
                <h3>{t("assetManagerHomeScreen.feedLabel")}</h3>
                <div>
                    <SearchInput value={search} onChange={setSearch}/>
                    {!props.isAdmin && <CreateNew/>}
                </div>
            </div>
            <div>
                <FeedHeader companies={props.companies} isAdmin={props.isAdmin} sortFC={sortFeeds} withSort={true}/>
                {
                    pend
                        ? <Preloader/>
                        : data.map(
                        ({title, type, issueDate, id, isAssetManagerApproved, isAdminApproved, isPublish, companyName, views}: FeedType) => {
                            return <FeedComponent
                                views={views}
                                companyName={typeof companyName === "string" ? companyName : ' '}
                                withSort={true}
                                isAdmin={props.isAdmin}
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
