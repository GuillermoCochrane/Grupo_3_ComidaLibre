import React, {Fragment, useState, useEffect} from 'react';
import ProductHeader from './ProductHeader';
import ProductRow from './ProductRow';
import './allProducts.css';

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
        <div className="card shadow mb-4">
            <div className="card-body">
                <div className="table-responsive">
                    <caption>
                        PRODUCTOS
                    </caption>
                    <table className="table table-bordered" width="100%" cellSpacing="0">
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
            </div>
        </div>
    </Fragment>
  )
}

export default AllProducts;