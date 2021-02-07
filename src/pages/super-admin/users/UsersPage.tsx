import React, {useEffect, useReducer, useState} from 'react';
import {DashboardWrapper} from '../../dashboard/dashboard-style';
import UsersHeader, {UserElement} from "../../../components/users-component/Users-component";
import Preloader from "../../../utils/preloader/preloader";
import reducer from "../../../state/RootReducer";
import {getData} from "../../../App";
import {UserType} from "../../../components/feedComponents/feed";
import {db} from "../../../firebase";
import {useTranslation} from "react-i18next";


const UsersPage: React.FC<{ isUser?: boolean }> = (props) => {
    const [state] = useReducer(reducer, {
        userData: JSON.parse(localStorage.getItem('userData') as string),
    })
    const {t} = useTranslation()
    const [pending, setPending] = useState(true)
    const [users, setUsers] = useState<any>([])
    const [appUsers, setAppUsers] = useState(users)
    useEffect(() => {
        let newArr = props.isUser ? users.filter((i: any) => !i.isAssetManager) : users.filter((i: any) => i.isAssetManager)
        setAppUsers([...newArr])
    }, [users, props.isUser])
    useEffect(() => {
        getData('/users', state, setUsers, setPending)
    }, [state, state.userData])

    const userDelete = (id: string) => {
        db.ref('users').child(id).remove().then((res) => {
            console.log(res)
        })
    }
    if (pending) return <div className={'preloaderWrapper'}><Preloader/></div>
    return (
        <DashboardWrapper>
            <h3>{t("assetManagerHomeScreen.adminPanel").toUpperCase()}</h3>
            <div className={'title'}>
                <h3>{t("assetManagerHomeScreen.users").toUpperCase()}</h3>
            </div>
            <UsersHeader/>
            {
                appUsers.map((user: UserType) => <UserElement
                    key={user.email}
                    del={userDelete}
                    title={user.fullname}
                    email={user.email}
                    company={user.companyName}
                    status={user.verified ? user.verified : false}
                    id={user.id}/>
                )
            }
        </DashboardWrapper>
    );
}

export default UsersPage;