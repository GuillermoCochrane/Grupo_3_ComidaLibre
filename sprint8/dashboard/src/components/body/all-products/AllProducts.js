import React, {Fragment} from 'react'
import ProductHeader from './ProductHeader'
import ProductRow from './ProductRow'
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
            <table className='products-table' width="100%" cellSpacing="0">
                <caption>
                    PRODUCTS
                </caption>

                <thead>
                    <ProductHeader/>
                </thead>

                <tbody>
                    {
                        productsList.map((item, i) => {
                            return <ProductRow {...item} key = {`productRow-${i}`} />
                            })
                    }                   
                </tbody>

            </table>
        </div>
    </Fragment>
  )
}

export default AllProducts