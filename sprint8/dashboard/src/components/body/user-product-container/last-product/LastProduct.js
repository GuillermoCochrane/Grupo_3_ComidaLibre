import React, {Fragment, useState, useEffect} from 'react'

function LastProduct() {
    const [lastProduct, setLastProduct] = useState([]);

    useEffect(() => {
		
		const endpoint = 'http://localhost:3000/api/products?page=all'
		
        fetch(endpoint)
        .then(response => response.json())
        .then(data => {
            setLastProduct(data.products.pop());
        })
        .catch(error => console.log(error));
		
	}, []);

  return (
    <Fragment>
        <div className="last-product-card">
            <h2>Ultimo producto</h2>
            <div className='last-product-img'>
                <img src="" alt="user-img"/>
            </div>            
            <h4>{lastProduct.name}</h4>
            <br/>
            <p>{lastProduct.description}</p>
        </div>
    </Fragment>
  )
}

export default LastProduct