import React, { useState, useEffect, useRef } from 'react';
import SearchResults from './SearchResults';
import './searchContainer.css'

function SearchContainer() {

	const [products, setProducts] = useState([]); 
	const [key, setKey] = useState('');
	const inputKey = useRef();

	const searchProduct = async (e) => {
		e.preventDefault();
		const inputValue = inputKey.current.value;
		setKey(inputValue);
		inputKey.current.value = '';
	};
	
	useEffect(() => {

		const endpoint = `http://localhost:3000/api/search/${key}`;

		fetch(endpoint)
		.then(response => response.json())
		.then(data => {
			setProducts(data.data);			
		})
		.catch(error => console.log(error));

	}, [key]);

	console.log(products);

	
	return (
			
			<div className="search-container">
				<div className="form-search-header">
					<form id="search-bar-form" className="form-search-header"  method="GET" onSubmit={searchProduct}>
						<input type="search" name="key" id="key" ref={inputKey} placeholder="Buscar productos..." />
						<button id="search-bar-btn" type="submit"><i className="fas fa-search"></i></button>
					</form>
					<div id="search-result-div">
						<ul	ul id="search-result-list" className="search-result-list-off"></ul>
					</div>
				</div>

				<main className="main-products">
					{products.length === 0 && <h2 className="products-title" >No hay productos que coincidan con esa búsqueda</h2>}
					{products.length > 0 && <h1>Resultados de la búsqueda: {key} </h1>}
					<section className="section-article">
						{products.length > 0 && products.map((product, i) => {
							return <SearchResults {...product} key = {`searchResults-${i}`}/>
								})
						}
					</section>

				</main>

			</div>
	)
}

export default SearchContainer
