import React from 'react';
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
// import reducer from "./state/RootReducer";
// import {getData} from "./App";
// import {db} from "./firebase";
import {UserType} from "./components/feedComponents/feed";


export const useRoute = (state:any, user:UserType, notifications: any) => {
    // const [stat] = useReducer(reducer, {
    //     userData: JSON.parse(localStorage.getItem('userData') as string),
    // })
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

