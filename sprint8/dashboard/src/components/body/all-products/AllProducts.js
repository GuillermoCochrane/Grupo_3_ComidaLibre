import React, {Fragment, useState, useEffect} from 'react'
import ProductHeader from './ProductHeader'
import ProductRow from './ProductRow'
import './allProducts.css'


function AllProducts() {
    const [productsList, setProductsList] = useState([]);

    useEffect(() => {
		
		const endpoint = 'http://localhost:3000/api/products?page=all'
		
        fetch(endpoint)
        .then(response => response.json())
        .then(data => {
            setProductsList(data.products);
        })
        .catch(error => console.log(error));
		
	}, []);

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