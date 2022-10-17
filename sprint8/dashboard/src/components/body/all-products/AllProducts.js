import React, {Fragment, useState, useEffect} from 'react';
import ProductHeader from './ProductHeader';
import ProductRow from './ProductRow';
import './allProducts.css';

function AllProducts() {
    
    const [productsList, setProductsList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [productsQuantity, setProductsQuantity] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
		
        let endpoint = `http://localhost:3000/api/products?page=${currentPage}`
        setLoading(true);
		
        fetch(endpoint)
        .then(response => response.json())
        .then(data => {
            setProductsList(data.products);
            setProductsQuantity(data.count);
            setLoading(false);
        })
        .catch(error => console.log(error));
		
	}, [currentPage]);

    const onPageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    }
    
    const onPrevClick = () => {    
        setCurrentPage( (prev) => prev-1);
    }
    
    const onNextClick = () => {
        setCurrentPage(prev=>prev+1);
        }
    
    const handlePageClick = (e) => {
        onPageChange(Number(e.target.id));
    }
    
    let totalPages = 1
    if (productsQuantity !== 0){
    let p = 0
    if (productsQuantity % 10 !== 0){
        p = Math.trunc(productsQuantity/10) + 1
    }else{
        p = productsQuantity/10
    }
    totalPages = p;
    }

    const pages = [];
    for(let i=1 ; i<=totalPages; i++){
        pages.push(i);
    }

  return (
    <Fragment>
        <div className="card shadow mb-4">
        <div className="card-body">
                {!loading ? 
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

                    <div className='pageNumbers-container'>
                        <ul className="pageNumbers"> 
                            <li>
                                <button onClick={onPrevClick} disabled={currentPage === pages[0]}>
                                    <i class="fas fa-angle-double-left" ></i>
                                </button>
                            </li>
                            
                            {
                                pages.map(page => { 
                                return (
                                        <li key={page} id={page} onClick={handlePageClick} 
                                            className={currentPage===page ? 'active' : null}>
                                            {page}
                                        </li>
                                        );
                                    })
                            }

                            <li>
                                <button onClick={onNextClick} disabled={currentPage === pages[pages.length-1]}>
                                    <i class="fas fa-angle-double-right" ></i>
                                </button>
                            </li>
                    </ul>
                    </div>
                </div>
                : <div> Cargando... </div>}
                
            </div>
        </div>
    </Fragment>
    )
}

export default AllProducts;