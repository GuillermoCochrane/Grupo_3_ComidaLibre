import React, {Fragment, useState, useEffect} from 'react';
import UserRow from './UserRow';
import UserHeader from './UserHeader';
import './allUsers.css';

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
        <div className="card shadow mb-4">
            <div className="card-body">
                <div className="table-responsive">
                    <caption>
                        USUARIOS
                    </caption>
                    <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
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
            </div>
        </div>
    </Fragment>
    )
}

export default AllUsers;