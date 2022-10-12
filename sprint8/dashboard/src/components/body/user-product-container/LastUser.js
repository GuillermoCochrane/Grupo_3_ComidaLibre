import React, {Fragment, useState, useEffect} from 'react';
import LastTitle from './LastTitle';
import LastImg from './LastImg';
import LastInfo from './LastInfo';
import './lastUser.css';

function LastUser() {
    const [lastUser, setLastUser] = useState([]);

    useEffect(() => {
		
		const endpoint = 'http://localhost:3000/api/users/last'
		
        fetch(endpoint)
        .then(response => response.json())
        .then(data => {
            setLastUser(data);
        })
        .catch(error => console.log(error));
		
	}, []);
    console.log(lastUser)

  return (
    <Fragment>

        <div className="last-card">

            { !lastUser  && <p>Cargando</p>}

            <LastTitle title='Usuario' id={lastUser.username}/>
                <div className='last-info-container'>
                    <div>
                        <LastImg img={lastUser.imageURL} name={lastUser.username}/>
                    </div>
                    <div className='last-info-detail'>
                        <LastInfo title="Nombre:" data={lastUser.first_name} />
                        <LastInfo title="Apellido: " data={lastUser.last_name} />
                        <LastInfo title='E-Mail: ' data={lastUser.email}/>
                        <LastInfo title='Dirección: ' data={lastUser.address}/>
                        <LastInfo title='Teléfono:' data={lastUser.phone}/>
                    </div>
                </div>

        </div>
    </Fragment>
  )
}

export default LastUser


