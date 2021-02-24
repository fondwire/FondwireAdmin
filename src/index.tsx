import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {I18nextProvider} from "react-i18next";
import i18n from './i18n/index'
import { unregister as unregisterServiceWorker } from './serviceWorker'

ReactDOM.render(
    <I18nextProvider i18n={i18n}>
        <React.StrictMode>
            <App/>
        </React.StrictMode>
    </I18nextProvider>
    ,
    document.getElementById('root')
);

unregisterServiceWorker();