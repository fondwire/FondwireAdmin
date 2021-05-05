import React, {useEffect, useReducer, useState} from 'react';
import './App.css';
import Preloader from "./utils/preloader/preloader";
import {useRoute} from "./router";
import reducer from './state/RootReducer'
import {db} from "./firebase";
import {FeedComponentProps} from "./components/feedComponents/FeedComponents";
import {UserType} from "./components/feedComponents/feed";

export const MyContext = React.createContext<any>(null)


export const getData = (path:string, state:any, setData:(arr: Array<any>)=>void, setPend:(bool:boolean)=> void, isAdmin?: boolean,) => {
    const feeds = db.ref(path)
    feeds.once('value', function(snapshot){
        return snapshot.toJSON()
    }).then((data)=>{
        const fObject:any = data.toJSON()
        const feeds = path === '/feeds' ? {...fObject.articles, ...fObject.events,...fObject.videos} : {...fObject}
        let arr:Array<FeedComponentProps> = Object.values(feeds)
        let keys:Array<string> = Object.keys(feeds)
        keys.forEach((item:string, index)=>{
            arr[index] = {id: item, ...arr[index]}
        })
        if(path === '/notification'){
            arr = feeds
        }
        if(path === '/assets'){
            const nameArr:any = Object.keys(feeds)
            arr = arr.map((item:any, index) => {
                return {
                    ...item,
                    name: nameArr[index]
                }
            })
        }
        if(arr.length && arr[0].issueDate){
            arr = arr.sort((a:any,b:any)=> b.issueDate - a.issueDate)
        }
        if(path === '/feeds' && !isAdmin ){
            arr = arr.filter(({uid}:any)=> state.userData && uid === state.userData.uid )
        }else if(path === '/feeds' && isAdmin){
            arr = arr.filter(({isPublish}:any)=> isPublish)
            arr = arr.map((item: any )=>{
                return {companyName: db.ref('/users').child(item.uid).child('companyName'), ...item}
            })
        }else if(path === '/users'){
            arr.reverse()
        }
        setData(arr)
        setPend(false)
    })
}


function App() {
    const [pending, setPending] = useState(true)
    const [users, setUsers] = useState<any>([])
    const [user, setUser] = useState<any>(null)
    const [state, dispatch] = useReducer(reducer,{
        userData: JSON.parse(localStorage.getItem('userData') as string),
    })
    const [data, setData] = useState<any>([])
    const [notifications, setNotifications] = useState<any>([])
    const [companies, setCompanies] = useState<any>([])
    useEffect(()=>{
        getData('/assets', state, setCompanies, ()=>{})
    }, [state])
    useEffect(()=>{
        getData('/users', state, setUsers, ()=>{})
    }, [state])

    useEffect(()=>{
        if(state.userData) {
            users.forEach((item: UserType) => {
                if (state.userData.email === item.email) {
                    setUser(item)
                }
            })
        }
        // setPending(false)
    }, [users, state])
    useEffect(()=>{
        if(state?.userData?.isAdmin) {
            const feed = data.feeds
            const users = data.users
            const feedLength = feed ? Object.keys(feed).length : null
            const userLength = users ? Object.keys(users).length : null
            let arr: any = []
            let kk = 0
            let ii = 0
            let userCount = 0
            if (feedLength) {
                for (let i in feed) {
                    for (let k in feed[i]) {
                        let fLength = Object.keys(feed[i]).length
                        db.ref('/feeds').child(i).child(feed[i][k].id).once('value', function (snapshot) {
                            return snapshot.toJSON()
                        }).then((feedData) => {
                            // setNotifications([...notifications,feedData.toJSON()])
                            kk++
                            if (feedData.toJSON()) {
                                arr.push({
                                    id: feed[i][k].id,
                                    notificationId: k,
                                    isFeed: true,
                                    ...feedData.toJSON()
                                })
                                if (ii === feedLength && kk === fLength) {
                                    for (let i in users) {
                                        db.ref('/users').child(users[i].id).once('value', function (snapshot) {
                                            return snapshot.toJSON()
                                        }).then((userData) => {
                                            // setNotifications([...notifications, userData.toJSON()])
                                            userCount++
                                            if (userData.toJSON()) {
                                                arr.push({isFeed: false, ...userData.toJSON()})
                                                if (userCount === userLength) {
                                                    // console.log(userCount)
                                                    arr.sort((a:any, b:any) => b.issueDate - a.issueDate)
                                                    setNotifications(arr)
                                                    setPending(false)
                                                }
                                            } else {
                                                if (userCount === userLength) {
                                                    arr.sort((a:any, b:any) => b.issueDate - a.issueDate)
                                                    setNotifications(arr)
                                                    setPending(false)
                                                }
                                            }
                                        })
                                    }
                                }
                                arr.sort((a:any, b:any) => b.issueDate - a.issueDate)
                                setNotifications([...arr])
                                if (kk === fLength) {
                                    setPending(false)
                                }
                            } else {
                                setPending(false)
                            }
                            ii++
                        })
                    }
                }
            } else if (userLength) {
                for (let i in users) {
                    db.ref('/users').child(users[i].id).once('value', function (snapshot) {
                        return snapshot.toJSON()
                    }).then((userData) => {
                        // setNotifications([...notifications, userData.toJSON()])
                        userCount++
                        if (userData.toJSON()) {
                            arr.push({isFeed: false, ...userData.toJSON()})
                            if (userCount === userLength) {
                                // console.log(userCount)
                                setNotifications(arr)
                                setPending(false)
                            }
                        } else {
                            if (userCount === userLength) {
                                setNotifications(arr)
                                setPending(false)
                            }
                        }
                    })
                }
            } else {
                setPending(false)
            }
        }
    }, [data.feeds, data.users, state])
    useEffect(()=>{
        if (state?.userData?.isAdmin){
            getData('/notification', state, setData, ()=>{})
        }else{
            getData('/notification', state, setData, setPending)
        }
    }, [ state, state.userData, pending ])

    const route = useRoute(state, user, notifications, setPending, companies)

    if (pending) return <div className={'mainPreloaderWrapper'}><Preloader/></div>
    return <MyContext.Provider value={{dispatch}}>
        {/*<Router>*/}
            <div className="App">{route}</div>
        {/*</Router>*/}
    </MyContext.Provider>
}

export default App;
