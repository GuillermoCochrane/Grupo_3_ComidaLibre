import React, {Fragment} from 'react'
import ProductHeader from './ProductHeader'
import ProductList from './ProductList'
import './allProducts.css'

let productsList =[
    {
        id: 1,
        name: 'Coca Cola',
        price: 666,
        category: 'bebida',
        status: 'En oferta',
    },
    {
        id: 1,
        name: 'Coca Cola',
        price: 666,
        category: 'bebida',
        status: 'En oferta',
    },
    {
        id: 1,
        name: 'Coca Cola',
        price: 666,
        category: 'bebida',
        status: 'En oferta',
    },
    {
        id: 1,
        name: 'Coca Cola',
        price: 666,
        category: 'bebida',
        status: 'En oferta',
    },
]

function AllProducts() {
  return (
    <Fragment>
        <div className="allproducts">
            <table className='products-table'>
                <caption>
                    PRODUCTS
                </caption>

                <thead>
                    <ProductHeader/>
                </thead>

                <tbody>
                    {
                        productsList.map((item, i) => {
                            return <ProductList {...item} key = {`item-${i}`} />
                            })
                    }                   
                </tbody>

            </table>
        </div>
    </Fragment>
  )
}

export default AllProducts