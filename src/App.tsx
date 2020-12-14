import React, {useEffect, useReducer, useState} from 'react';
import './App.css';
import Preloader from "./utils/preloader/preloader";
import {useRoute} from "./router";
import {BrowserRouter as Router} from "react-router-dom";
import reducer from './state/RootReducer'
import {db} from "./firebase";
import {FeedComponentProps} from "./components/feedComponents/FeedComponents";
import {UserType} from "./components/feedComponents/feed";

export const MyContext = React.createContext<any>(null)


export const getData = (path:string , state:any, setData:(arr: Array<any>)=>void, setPend:(bool:boolean)=> void) => {
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
    const [users, setUsers] = useState<any>([])
    const [user, setUser] = useState<any>(null)
    const [state, dispatch] = useReducer(reducer,{
        userData: JSON.parse(localStorage.getItem('userData') as string),
    })
    useEffect(()=>{
        getData('/users', state, setUsers, ()=>{})
    }, [state])
    useEffect(()=>{
        users.forEach((item:UserType)=>{
            if(state.userData.email === item.email){
                setUser(item)
            }
        })
        setPending(false)
    }, [users, state.userData.email])
    const route = useRoute(state, user)

    if (pending) return <div className={'mainPreloaderWrapper'}><Preloader/></div>
    return <MyContext.Provider value={{dispatch}}>
        <Router>
            <div className="App">{route}</div>
        </Router>
    </MyContext.Provider>
}

export default App;
