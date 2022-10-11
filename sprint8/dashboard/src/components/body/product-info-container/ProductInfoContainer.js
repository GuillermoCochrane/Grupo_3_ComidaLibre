import React, {Fragment, useState, useEffect} from 'react'
import './productInfoContainer.css'
import InfoContainer from './InfoContainer'

let status =[
    {
        name: 'En oferta',
        count: "13",
        color: '',
        backgroundColor: 'red'
    },
    {
        name: 'Más vendido',
        count: 33,
        color: '',
        backgroundColor: 'yellow'
    },
    {
        name: 'Nuevo',
        count: 7,
        color: '',
        backgroundColor: 'lightGreen'
    },
    {
        name: 'Recomendado',
        count: 6,
        color: '',
        backgroundColor: 'blue'
    },
]
function ProductInfoContainer() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
		const endpoint = 'http://localhost:3000/api/products'
		
        fetch(endpoint)
        .then(response => response.json())
        .then(data => {
            setCategories(data.countByCategory);
        })
        .catch(error => console.log(error));
		
	}, []);

    
    return (
            <Fragment>
                <div className="product-info-container">
                    {categories.lenght === 0 && <p>Cargando</p>}

                    <InfoContainer title='Todas las categorías' info={categories}/>

                    <InfoContainer title='Todos los estados' info={status}/>
                </div>
            </Fragment>
)
}

export default ProductInfoContainer