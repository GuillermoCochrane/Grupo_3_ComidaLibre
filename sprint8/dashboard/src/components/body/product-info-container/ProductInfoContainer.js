import React, {Fragment} from 'react'
import './productInfoContainer.css'
import InfoContainer from './InfoContainer'

let categories =[
    {
        name: 'entrada',
        count: 13,
        color: '',
        backgroundColor: 'red'
    },
    {
        name: 'plato principal',
        count: 33,
        color: '',
        backgroundColor: 'green'
    },
    {
        name: 'bebidas',
        count: 7,
        color: '',
        backgroundColor: 'brown'
    },
    {
        name: 'postre',
        count: 6,
        color: '',
        backgroundColor: 'yellow'
    },
]
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
    return (
            <Fragment>
                <div className="product-info-container">
                    <InfoContainer title='todas las categorias' info={categories}/>

                    <InfoContainer title='todos los estados' info={status}/>
                </div>
            </Fragment>
)
}

export default ProductInfoContainer