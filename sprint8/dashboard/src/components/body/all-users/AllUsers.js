import React, {Fragment, useState, useEffect} from 'react'
import './allUsers.css';
import UserRow from './UserRow';
import UserHeader from './UserHeader'


function AllUsers() {

    const [usersList, setUsersList] = useState([]);

    useEffect(() => {
		
		const endpoint = 'http://localhost:3000/api/users/table'
		
        fetch(endpoint)
        .then(response => response.json())
        .then(data => {
            setUsersList(data.users);
        })
        .catch(error => console.log(error));
		
	}, []);
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
                            return <UserRow {...item} key = {`userRow-${i}`} />
                            })
                    }
                </tbody>
            </table>
        </div>
    </Fragment>
    )
}

export default AllUsers