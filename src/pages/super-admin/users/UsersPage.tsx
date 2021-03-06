import React, {useEffect, useReducer, useState} from 'react';
import { DashboardWrapper } from '../../dashboard/dashboard-style';
import UsersHeader, { UserElement } from "../../../components/users-component/Users-component";
import Preloader from "../../../utils/preloader/preloader";
import reducer from "../../../state/RootReducer";
import {getData} from "../../../App";
import {UserType} from "../../../components/feedComponents/feed";



const UsersPage:React.FC<{isUser?: boolean}> = (props) => {
    const [state] = useReducer(reducer, {
        userData: JSON.parse(localStorage.getItem('userData') as string),
    })
    const [pending, setPending] = useState(true)
    const [users, setUsers] = useState<any>([])
    const [appUsers, setAppUsers] = useState(users)
    useEffect(()=>{
        let newArr = props.isUser ? users.filter((i:any)=> !i.isAssetManager ) :  users.filter((i:any)=> i.isAssetManager )
        setAppUsers([...newArr])
    }, [users, props.isUser])
    useEffect(()=>{
        getData('/users', state, setUsers, setPending)
    }, [state, state.userData])

    if(pending) return <div className={'preloaderWrapper'}><Preloader /></div>
    return (
        <DashboardWrapper>
            <h3>ADMIN PANEL</h3>
            <div className={'title'}>
                <h3>USERS</h3>
            </div>
            <UsersHeader />
            {
                // props.isUser ?
                    appUsers.map((user:UserType)=>  <UserElement
                        key={user.email}
                        title={user.fullname}
                        email={user.email}
                        company={user.companyName}
                        status={user.verified ? user.verified : false}
                        id={user.id}/>
                    )
                    // : users.map((user:UserType)=>  <UserElement
                    // key={user.email}
                    // title={user.fullname}
                    // email={user.email}
                    // company={user.companyName}
                    // status={user.verified ? user.verified : false}
                    // id={user.id}/>
                    // )
            }
            {/*<UserElement email={'a@mail.ru'} title={'Asylbekov Aman'} id={1} company={'Tesla'} status={'Active'} />*/}
            {/*<UserElement email={'a@mail.ru'} title={'Asylbekov Aman'} id={1} company={'Tesla'} status={'rejected'} />*/}
            {/*<UserElement email={'a@mail.ru'} title={'Asylbekov Aman'} id={1} company={'Tesla'} status={'pending'} />*/}
            {/*<UserElement email={'a@mail.ru'} title={'Asylbekov Aman'} id={1} company={'Tesla'} status={'suspended'} />*/}
        </DashboardWrapper>
    );
}

export default UsersPage;