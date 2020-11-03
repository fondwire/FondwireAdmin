import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import Navbar from "./components/navbar/Navbar";
import Dashboard from "./pages/dashboard/Dashboard";
import AnalyticsPage from "./pages/analytics/Analytics-page";


export const useRoute = (isAuth: boolean) => {
    if (isAuth) {
        return <div className={'adminPanelWrapper'}>
            <Navbar/>
            <div className={'contentWrapper'}>
                <Switch>
                    <Route path={'/dashboard'}>
                        <Dashboard />
                    </Route>
                    <Route path={'/feed'}>
                        <h1>Feed</h1>
                    </Route>
                    <Route path={'/analytics'}>
                        <AnalyticsPage />
                    </Route>
                    <Route path={'/settings'}>
                        <h1>Settings</h1>
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

