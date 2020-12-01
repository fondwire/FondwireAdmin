import React from 'react';
import { DashboardWrapper } from '../../dashboard/dashboard-style';
import UsersHeader, { UserElement } from "../../../components/users-component/Users-component";



function UsersPage() {
    return (
        <DashboardWrapper>
            <h3>WELCOME TO ADMIN PANEL</h3>
            <div className={'title'}>
                <h3>USERS</h3>
            </div>
            <UsersHeader />
            <UserElement email={'a@mail.ru'} title={'Asylbekov Aman'} id={1} company={'Tesla'} status={'Active'} />
            <UserElement email={'a@mail.ru'} title={'Asylbekov Aman'} id={1} company={'Tesla'} status={'rejected'} />
            <UserElement email={'a@mail.ru'} title={'Asylbekov Aman'} id={1} company={'Tesla'} status={'pending'} />
            <UserElement email={'a@mail.ru'} title={'Asylbekov Aman'} id={1} company={'Tesla'} status={'suspended'} />
        </DashboardWrapper>
    );
}

export default UsersPage;