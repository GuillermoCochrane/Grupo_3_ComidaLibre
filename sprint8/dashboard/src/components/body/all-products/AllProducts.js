import React, {Fragment} from 'react'
import '../all-products/allProducts.css'

function AllProducts() {
  return (
    <Fragment>
        <div className="allproducts">
            <table className='products-table'>
                <caption>
                    PRODUCTS
                </caption>

                <thead>
                    <tr>
                        <th className='products-th'>id</th>
                        <th className='products-th'>nombre</th>
                        <th className='products-th'>precio</th>
                        <th className='products-th'>category</th>
                        <th className='products-th'>status</th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td className='products-td'>1</td>
                        <td className='products-td'>product name</td>
                        <td className='products-td'>33.44</td>
                        <td className='products-td'>bebida</td>
                        <td className='products-td'>oferta</td>
                    </tr>
                </tbody>

            </table>
        </div>
    </Fragment>
  )
}

export default AllProducts