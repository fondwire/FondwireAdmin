import React, {useReducer, useState} from 'react';
import './App.css';
import Preloader from "./utils/preloader/preloader";
import {useRoute} from "./router";
import {BrowserRouter as Router} from "react-router-dom";
import reducer from './state/RootReducer'

export const MyContext = React.createContext<any>(null)


function App() {
    const [pending, setPending] = useState(true)
    const [state, dispatch] = useReducer(reducer,{
        userData: JSON.parse(localStorage.getItem('userData') as string),
    })
    const route = useRoute(state)

    setTimeout(() => {
        setPending(false)
    }, 2000)

    if (pending) return <Preloader/>
    return <MyContext.Provider value={{dispatch}}>
        <Router>
            <div className="App">{route}</div>
        </Router>
    </MyContext.Provider>
}

export default App;
