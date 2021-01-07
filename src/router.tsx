import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import Navbar from "./components/navbar/Navbar";
import Dashboard from "./pages/dashboard/Dashboard";
import AnalyticsPage from "./pages/analytics/Analytics-page";
import Feed from "./pages/feed/Feed";
import SettingsPage from "./pages/settings/Settings-page";
import CreateFeed from "./pages/create(edit)-feed";
import WelcomePage from "./pages/welocome/Welcome-page";
import SignWrapper, {Forgot, SignIn, SignUp} from "./pages/sign-in/Sign-in";
import Users from './pages/super-admin/users/UsersPage';
import CompaniesPage from './pages/super-admin/companies/Companies-page';
import NotificationsPage from "./pages/super-admin/notifications/Notifications-page";
import {UserType} from "./components/feedComponents/feed";
import Unverified from "./pages/unverified/Unverified";
import AssetManage from "./pages/asset-manager/AssetManage";
// import reducer from "./state/RootReducer";
// import {getData} from "./App";
// import {db} from "./firebase";


export const useRoute = (state:any, user:UserType, notifications: any, setPending: (status:boolean)=>void) => {
    // const [stat] = useReducer(reducer, {
    //     userData: JSON.parse(localStorage.getItem('userData') as string),
    // })
    if(!state?.userData?.isAdmin && state?.userData && !state?.userData?.verified){
        return <div className={'notLoggedInWrapper'}>
            <Switch>
                <Route exact path={'/'}>
                    <Unverified />
                </Route>
                <Redirect to={'/'}/>s
            </Switch>
        </div>
    }else if (!!state?.userData) {
        return <div className={'adminPanelWrapper'}>
            <Navbar notificationLength={notifications} isAdmin={state.userData.isAdmin}/>
            <div className={'contentWrapper'}>
                {
                    state.userData.isAdmin
                        ? <Switch>
                            <Route path={'/managers'}>
                                <Users />
                            </Route>
                            <Route path={'/companies'}>
                                <CompaniesPage />
                            </Route>
                            <Route path={'/notifications/feed/:type/:id/:notificationId'}>
                                <CreateFeed/>
                                {/*<NotificationsPage setPending={setPending} data={notifications} />*/}
                            </Route>
                            <Route path={'/notifications'}>
                                <NotificationsPage setPending={setPending} data={notifications} />
                            </Route>
                            <Redirect to={'/managers'}/>
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
                <Route exact path={'/asset-manager'}>
                    <AssetManage />
                </Route>
                <Route exact path={'/sign-in'}>
                    <SignWrapper>
                        <SignIn/>
                    </SignWrapper>
                </Route>
                <Route exact path={'/forgot'}>
                    <SignWrapper>
                        <Forgot />
                    </SignWrapper>
                </Route>
                <Route exact path={'/sign-up'}>
                    <SignWrapper>
                        <SignUp/>
                    </SignWrapper>
                    {/*<SignIn/>*/}
                </Route>
                <Redirect to={'/'}/>
            </Switch>
        </div>
    }
};

