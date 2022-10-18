import React,{useState, useEffect} from 'react' 
import { useParams } from 'react-router-dom';
import DetailInfo from './DetailInfo';
import DetailImg from './DetailImg';
import DetailTitle from './DetailTitle';
import DetailEditDelete from './DetailEditDelete';

import './productDetail.css'

function UserDetail() {

    const [userDetail, setUserDetail] = useState([]);
    const {id} = useParams();
  
    useEffect(() => {
		const endpoint = `http://localhost:3000/api/users/${id}`
		
        fetch(endpoint)
        .then(response => response.json())
        .then(data => {
            setUserDetail(data);
        })
        .catch(error => console.log(error));
		// eslint-disable-next-line
	}, []);

  return (
    <main className="main-product-detail">

            <DetailTitle title='Usuario' id={userDetail.username} />

            {userDetail.lenght === 0 && <p>Cargando</p>}

            <article className="main-product">

                <DetailImg img={userDetail.imgURL} name={userDetail.username} />

                <div className="main-detail">
                    <h2 className="title0">
                        {userDetail.name}
                    </h2>

                    <DetailInfo title='Nombre: ' data={userDetail.first_name} />

                    <DetailInfo title='Apellido' data={userDetail.last_name} />

                    <DetailInfo title='E-Mail: ' data={userDetail.email}/>

                    <DetailInfo title='Dirección: ' data={userDetail.address}/>

                    <DetailInfo title='Telefono: ' data={userDetail.phone}/>

                    <DetailEditDelete {...userDetail} />

                </div>
            </article>
        </main>
        )
}

export default UserDetail