import React, {Fragment, useState, useEffect} from 'react'

function LastUser() {
    const [lastUser, setLastUser] = useState([]);

    useEffect(() => {
		
		const endpoint = 'http://localhost:3000/api/users/table'
		
        fetch(endpoint)
        .then(response => response.json())
        .then(data => {
            setLastUser(data.users.pop());
        })
        .catch(error => console.log(error));
		
	}, []);
    console.log(lastUser)
  return (
    <Fragment>
        <div className="last-user-container">
            <div className="last-user-card">
                <h2>Ultimo usuario:  {lastUser.username}</h2>
                <div className='last-user-img'>
                    <img src="" alt="user-img"/>
                </div>
                <hr/>
                <h4 className='last-user-info'>Nombre: {lastUser.first_name}</h4>
                <h4 className='last-user-info'>Apellido: {lastUser.last_name}</h4>
                <hr/>                
                <h5 className='last-user-info'>E-Mail: {lastUser.email}</h5>
                <h5 className='last-user-info'>Direccion: {lastUser.address}</h5>
                <h5 className='last-user-info'>Telefono: {lastUser.phone}</h5>
                <hr/>
            </div>
        </div>
    </Fragment>
  )
}

export default LastUser


