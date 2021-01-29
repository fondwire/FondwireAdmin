import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {TableStyle} from "../../components/table-style/table-style";
import {TableComponentWrapper} from "../../components/feedComponents/Feed-style";
import {Link} from "react-router-dom";
import {db} from "../../firebase";


const ManagersWrapper = styled.div`
  margin-top: 40px;
  &>.header{
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 18px;
    font-family: 'Gotham-Bold', sans-serif;
  }
`

const TableWrapper = styled(TableStyle)`
  grid-template-columns: 1fr 1fr 1fr  30px;
`

function ManagersTableHeader() {
    return (
        <TableWrapper>
            <div>NAME</div>
            <div>EMAIL</div>
            <div>LAST LOGIN</div>
            <div/>
        </TableWrapper>
    );
}

const ManagersElementWrapper:any = styled(TableWrapper)`
  ${(props:any)=> TableComponentWrapper(props.bg)}
`
type CompaniesElementProps = {
    name: string
    id: string | number
    email: string
    lastLogin: string | number
}
export const ManagerElement:React.FC<CompaniesElementProps> = ({name, email, lastLogin, id}) => {
    // const Symbol = symbol.split('').slice(0,3).join('')
    return (
        <ManagersElementWrapper>
            <Link to={`/managers/${id}`} className={'title'}>{name}</Link>
            <div>{email}</div>
            <div>{lastLogin}</div>
            <div>
                {/*<Action/>*/}
            </div>
        </ManagersElementWrapper>
    )
}



const Managers:React.FC<{managers: any}> = ({managers}) => {
    const [managersData, setManagersData] = useState([])
    useEffect(()=>{
        let arr = Object.values(managers ? managers : {})
        let newArr:any = []
        arr.forEach((item:any, index) => {
            db.ref('users').child(item).once('value', function(snapshot){
                return snapshot.toJSON()
            }).then((res)=>{
                newArr.push({id: item, ...res.toJSON()})
                if(arr.length > index){
                    setManagersData(newArr)
                }
            })
        })
        // setManagersData(newArr)
    }, [managers])
    return (
        <ManagersWrapper>
            <div className={'header'}>
                <div>MANAGER(s)</div>
                <div>Create New +</div>
            </div>
            <ManagersTableHeader />
            {
                managersData.map((manger:any)=><ManagerElement
                    name={manger.fullname}
                    email={manger.email}
                    id={manger.id}
                    lastLogin={'01.01.2020'} />)
            }
        </ManagersWrapper>
    );
}

export default Managers;