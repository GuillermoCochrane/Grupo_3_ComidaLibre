import React, {Fragment, useState, useEffect} from 'react'
import './productInfoContainer.css'
import InfoContainer from './InfoContainer'


function ProductInfoContainer() {
    const [categories, setCategories] = useState([]);
    const [status, setStatus] = useState([]);

    useEffect(() => {
		const endpoint = 'http://localhost:3000/api/products'
		
        fetch(endpoint)
        .then(response => response.json())
        .then(data => {
            setCategories(data.countByCategory);
            const statusBackgroundColor = [ 'red', 'yellow', 'lightGreen', 'blue']
            let newStatus = data.countByStatus.map((item,i)=>{
                return { ...item, backgroundColor: statusBackgroundColor[i] }
            })
            setStatus(newStatus)
        })
        .catch(error => console.log(error));
		
	}, []);

    return (
            <Fragment>
                <div className="product-info-container">
                    {categories.lenght === 0 ? <p>Cargando</p> :
                    <InfoContainer title='Todas las categorías' info={categories}/>}

                    {status.lenght === 0 ? <p>Cargando</p> :
                    <InfoContainer title='Todos los estados' info={status}/>}
                </div>
            </Fragment>
)
}

export default ProductInfoContainer