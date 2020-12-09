import React, {useReducer, useState} from 'react';
import './App.css';
import Preloader from "./utils/preloader/preloader";
import {useRoute} from "./router";
import {BrowserRouter as Router} from "react-router-dom";
import reducer from './state/RootReducer'
import {db} from "./firebase";

export const MyContext = React.createContext<any>(null)


export const getData = (path:string , state:any, setData:(arr: Array<any>)=>void, setPend:(bool:boolean)=> void) => {
    const feeds = db.ref(path)
    feeds.once('value', function(snapshot){
        return snapshot.toJSON()
    }).then((data)=>{
        const fObject:any = data.toJSON()
        const feeds = path === '/feeds' ? {...fObject.articles, ...fObject.events,...fObject.videos} : {...fObject}
        let arr:Array<any> = Object.values(feeds)
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
        if(path === '/feeds'){
            arr = arr.filter(({uid}:any)=> state.userData && uid === state.userData.uid )
        }else if(path === '/users'){
            arr.reverse()
        }
        setData(arr)
        setPend(false)
    })
}


function App() {
    const [pending, setPending] = useState(true)
    const [state, dispatch] = useReducer(reducer,{
        userData: JSON.parse(localStorage.getItem('userData') as string),
    })
    const route = useRoute(state)
    setTimeout(() => {
        setPending(false)
    }, 2000)

    if (pending) return <div className={'mainPreloaderWrapper'}><Preloader/></div>
    return <MyContext.Provider value={{dispatch}}>
        <Router>
            <div className="App">{route}</div>
        </Router>
    </MyContext.Provider>
}

export default App;
