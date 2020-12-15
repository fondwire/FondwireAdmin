import React, {useEffect, useReducer, useState} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import Navbar from "./components/navbar/Navbar";
import Dashboard from "./pages/dashboard/Dashboard";
import AnalyticsPage from "./pages/analytics/Analytics-page";
import Feed from "./pages/feed/Feed";
import SettingsPage from "./pages/settings/Settings-page";
import CreateFeed from "./pages/create(edit)-feed";
import WelcomePage from "./pages/welocome/Welcome-page";
import SignIn from "./pages/sign-in/Sign-in";
import Users from './pages/super-admin/users/UsersPage';
import CompaniesPage from './pages/super-admin/companies/Companies-page';
import NotificationsPage from "./pages/super-admin/notifications/Notifications-page";
import reducer from "./state/RootReducer";
import {getData} from "./App";
import {db} from "./firebase";
import {UserType} from "./components/feedComponents/feed";


export const useRoute = (state:any, user:UserType) => {
    const [stat] = useReducer(reducer, {
        userData: JSON.parse(localStorage.getItem('userData') as string),
    })
    const [data, setData] = useState<any>([])
    const [notifications, setNotifications] = useState<any>([])
    useEffect(()=>{
        const feed = data.feeds
        const users = data.users
        let arr:any = []
        for(let i in feed){
            for(let k in feed[i]){
                db.ref('/feeds').child(i).child(feed[i][k].id).once('value', function(snapshot){
                    return snapshot.toJSON()
                }).then((feedData) => {
                    // setNotifications([...notifications,feedData.toJSON()])
                    if(feedData.toJSON()){
                        arr.push({isFeed: true,...feedData.toJSON()})
                    }
                })
            }
        }

        for (let i in users){
            db.ref('/users').child(users[i].id).once('value', function(snapshot){
                return snapshot.toJSON()
            }).then((userData) => {
                // setNotifications([...notifications, userData.toJSON()])
                if(userData.toJSON()) {
                    arr.push({isFeed: false,...userData.toJSON()})
                }
            })
        }
        setNotifications(arr)
        // const feeds = feed ? Object.values(feed) : []
        // const feedsArr:any = []
        // feeds.forEach((feedType:any) => feedsArr.push(...Object.values(feedType)))
        // console.log(feedsArr)
    }, [data])
    useEffect(()=>{
        getData('/notification', stat, setData, ()=>{})
    }, [ stat, stat.userData ])
    if (!!state?.userData) {
        return <div className={'adminPanelWrapper'}>
            <Navbar notificationLength={notifications} isAdmin={state.userData.isAdmin}/>
            <div className={'contentWrapper'}>
                {
                    state.userData.isAdmin
                        ? <Switch>
                            <Route path={'/users'}>
                                <Users />
                            </Route>
                            <Route path={'/companies'}>
                                <CompaniesPage />
                            </Route>
                            <Route path={'/notifications'}>
                                <NotificationsPage data={notifications} />
                            </Route>
                            <Redirect to={'/users'}/>
                        </Switch>
                        : <Switch>
                            <Route path={'/dashboard'}>
                                <Dashboard user={user}/>
                            </Route>
                            <Route path={'/feed/create/:type/:id'}>
                                <CreateFeed/>
                            </Route>
                            <Route path={'/feed/create/:type'}>
                                <CreateFeed/>
                            </Route>
                            <Route path={'/feed'}>
                                <Feed/>
                            </Route>
                            <Route path={'/analytics'}>
                                <AnalyticsPage/>
                            </Route>
                            <Route path={'/settings'}>
                                <SettingsPage user={user}/>
                            </Route>
                            <Redirect to={'/dashboard'}/>
                        </Switch>
                }

            </div>
        </div>
    } else {
        return <div className={'notLoggedInWrapper'}>
            <Switch>
                <Route exact path={'/'}>
                    <WelcomePage/>
                </Route>
                <Route path={'/sign-in'}>
                    <SignIn/>
                </Route>
                <Redirect to={'/'}/>
            </Switch>
        </div>
    }
};

