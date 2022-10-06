import React, {Fragment} from 'react';
import '../all-users/allUsers.css';
import UserList from './UserList';
import UserHeader from './UserHeader'


let usersList =[
    {
        id: 1,
        userName: 'Pulga',
        email: 'lionel@messi.com',
        first_name: 'Lionel',
        last_name: 'Messi',
        phone: 541112345678,
        address: 'ALVEAR 1670, Rosario',
    },
    {
        id: 1,
        userName: 'Pulga',
        email: 'lionel@messi.com',
        first_name: 'Lionel',
        last_name: 'Messi',
        phone: 541112345678,
        address: 'ALVEAR 1670, Rosario',
    },
    {
        id: 1,
        userName: 'Pulga',
        email: 'lionel@messi.com',
        first_name: 'Lionel',
        last_name: 'Messi',
        phone: 541112345678,
        address: 'ALVEAR 1670, Rosario',
    },
    {
        id: 1,
        userName: 'Pulga',
        email: 'lionel@messi.com',
        first_name: 'Lionel',
        last_name: 'Messi',
        phone: 541112345678,
        address: 'ALVEAR 1670, Rosario',
    },
    
]


function AllUsers() {
  return (
    <Fragment>
        <div className="allusers">
            <table className='users-table'>
                <caption>
                    USERS
                </caption>
                <thead>
                    <UserHeader/>
                </thead>

                <tbody>
                    {
                        usersList.map((item, i) => {
                            return <UserList {...item} key = {`item-${i}`} />
                            })
                    }
                </tbody>
            </table>
        </div>
    </Fragment>
    )
}

export default AllUsers