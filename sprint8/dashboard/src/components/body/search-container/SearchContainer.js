import React, { useState, useEffect, useRef } from 'react';
import SearchResults from './SearchResults';
import './searchContainer.css'

function SearchContainer() {

	const [products, setProducts] = useState(['Cargando']);
	const [searchbarProducts, setSearchbarProducts] = useState(['Cargando']); 
	const [submitKey, setSubmitKey] = useState(''); // on submit
	const [inputKey, setInputKey] = useState(''); // on input
	const inputKeyword = useRef();
    const searchResultList = useRef();

	const preSearch = async () => {
		const inputValue = inputKeyword.current.value;
		setInputKey(inputValue);
	};

	const focusForm  = async () => {
		searchResultList.current.className = "search-result-list-on"
	}

	const blurForm = async () => {
		searchResultList.current.className = "search-result-list-off"
	}

	const searchProduct = async (e) => {
		e.preventDefault();
		const inputValue = inputKeyword.current.value;
		setSubmitKey(inputValue);
		inputKeyword.current.value = '';
		searchResultList.current.className = "search-result-list-off"
	};
	
	useEffect(() => {

		const endpoint = `http://localhost:3000/api/search/${inputKey}`;

		fetch(endpoint)
		.then(response => response.json())
		.then(data => {
			setSearchbarProducts(data.data);			
		})
		.catch(error => console.log(error));

	}, [inputKey]);

	useEffect(() => {

		const endpoint = `http://localhost:3000/api/search/${submitKey}`;

		fetch(endpoint)
		.then(response => response.json())
		.then(data => {
			console.log(data)
			setProducts(data.data);			
		})
		.catch(error => console.log(error));

	}, [submitKey]);

	
	return (
			
			<div className="search-container">
				<div className="form-search-header">

					<form id="search-bar-form" className="form-search-header"  method="GET" onSubmit={searchProduct}>
						<input type="search" name="key" id="key" ref={inputKeyword} placeholder="Buscar productos..." onInput={preSearch}  onBlur={blurForm} onFocus={focusForm} /> 
						<button id="search-bar-btn" type="submit"><i className="fas fa-search"></i></button>
					</form>

					{searchbarProducts.length === 0 && 

							<div id="search-result-div">
								<ul	ul id="search-result-list" className="search-result-list-on" ref={searchResultList}>
									<li>No se encontraron productos...</li>
								</ul>
							</div>

					}

					{(searchbarProducts.length > 0 && searchbarProducts[0] !== 'Cargando') && 
					<div id="search-result-div">
						<ul	ul id="search-result-list" className="search-result-list-on" ref={searchResultList} >
							
							{searchbarProducts.map((product, i) => {
								return  (
											<li key={`searchbarProducts-${i}`}>
												<a href={`/products/${product.id}`}>{product.name}</a>
											</li>
										)
									}
								)
							}

						</ul>
					</div>}
				</div>

				<main className="main-products">
					{products.length === 0 && <h2 className="products-title" >No hay productos que coincidan con esa búsqueda</h2>}
					{(products.length > 0 && products[0] !== 'Cargando') && <h1>Resultados de la búsqueda: {submitKey} </h1>}
					<section className="section-article">
						{(products.length > 0 && products[0] !== 'Cargando') && products.map((product, i) => {
							return <SearchResults {...product} key = {`searchResults-${i}`}/>
								})
						}
					</section>

				</main>

			</div>
	)
}

export default SearchContainer
