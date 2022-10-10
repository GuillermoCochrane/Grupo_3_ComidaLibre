import React, {Fragment, useState, useEffect} from 'react'
import './productInfoContainer.css'
import InfoContainer from './InfoContainer'

let status =[
    {
        name: 'En oferta',
        count: "13",
        color: '',
        backgroundColor: 'default'
    },
    {
        name: 'Mas vendido',
        count: 33,
        color: '',
        backgroundColor: 'gray'
    },
    {
        name: 'Nuevo',
        count: 7,
        color: '',
        backgroundColor: 'lightGreen'
    },
    {
        name: 'recomendado',
        count: 6,
        color: '',
        backgroundColor: 'brown'
    },
]
function ProductInfoContainer() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
		// Petición Asincrónica al montarse el componente
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
                    {console.log(categories)}

                    <InfoContainer title='todas las categorias' info={categories}/>

                    <InfoContainer title='todos los estados' info={status}/>
                </div>
            </Fragment>
)
}

export default ProductInfoContainer