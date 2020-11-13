import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import Navbar from "./components/navbar/Navbar";
import Dashboard from "./pages/dashboard/Dashboard";
import AnalyticsPage from "./pages/analytics/Analytics-page";
import Feed from "./pages/feed/Feed";
import SettingsPage from "./pages/settings/Settings-page";
import CreateFeed from "./pages/create(edit)-feed";


export const useRoute = (isAuth: boolean) => {
    if (isAuth) {
        return <div className={'adminPanelWrapper'}>
            <Navbar/>
            <div className={'contentWrapper'}>
                <Switch>
                    <Route path={'/dashboard'}>
                        <Dashboard />
                    </Route>
                    <Route path={'/feed/create/:id'}>
                        <CreateFeed />
                    </Route>
                    <Route path={'/feed/create'}>
                        <CreateFeed />
                    </Route>
                    <Route path={'/feed'}>
                        <Feed />
                    </Route>
                    <Route path={'/analytics'}>
                        <AnalyticsPage />
                    </Route>
                    <Route path={'/settings'}>
                        <SettingsPage />
                    </Route>
                    <Redirect to={'/dashboard'} />
                </Switch>
            </div>
        </div>
    } else {
        return <div>
            welcome to fondwire
            <Switch>

            </Switch>
        </div>
    }
};

