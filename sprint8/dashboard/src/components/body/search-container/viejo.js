	// let searchBar = document.querySelector('#key')
    // let searchResult = document.querySelector("#search-result-list")
	// searchBar.addEventListener('input', search(searchBar, searchResult))
	// let search = (searchInput (searchBar), searchList (searchResult)) => { (C)
	let search =  () => {
		return async () => {
	     searchResultList.innerHTML = null
			// searchList.innerHTML = null (C)
	     if(inputKey.value.length !== 0) {
			// if(searchInput.value.length !== 0) { (C)
    			searchResultList.classList.remove("search-result-list-off")	
				// searchList.classList.remove("search-result-list-off") (C)
				searchResultList.classList.add("search-result-list-on")
				// searchList.classList.add("search-result-list-on") (C)
				await fetch(`http://localhost:3000/api/search/${inputKey.value}`)
				// await fetch(`http://localhost:3000/api/search/${searchInput.value}`) (C)
				.then(response => response.json())
				.then(data => {
					if (data.data.length !== 0) {
						for(let product of data.data) {
						// searchList.innerHTML += `<li><a href="/products/${product.id}">${product.name}</a></li>` (C)
						searchResultList.innerHTML += `<li><a href="/products/${product.categories_id}/${product.id}">${product.name}</a></li>` 
						}
					} else {
						searchResultList.innerHTML += "<li>No se encontraron productos...</li>"
						// searchList.innerHTML += "<li>No se encontraron productos...</li>" (C)
					}
	
				})
			} else {
				searchResultList.innerHTML = null
				// searchList.innerHTML = null (C)
			}
		}
	}