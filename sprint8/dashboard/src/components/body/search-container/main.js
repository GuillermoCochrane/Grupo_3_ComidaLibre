window.onload = () => {
  let searchBarDesktop = document.querySelector('#key')
  let searchResultDesktop = document.querySelector("#search-result-list")
  let searchBar = document.querySelector('#key-m')
  let searchResult = document.querySelector("#search-result-list-m")

  let search = (searchInput, searchList) => {
    return async () => {
      searchList.innerHTML = null
      if(searchInput.value.length !== 0) {
        searchList.classList.remove("search-result-list-off")
        searchList.classList.add("search-result-list-on")
        await fetch(`http://localhost:3000/api/search/${searchInput.value}`)
        .then(response => response.json())
        .then(data => {
          if (data.data.length !== 0) {
            for(let product of data.data) {
              searchList.innerHTML += `<li><a href="/products/${product.categories_id}/${product.id}">${product.name}</a></li>`
            }
          } else {
            searchList.innerHTML += "<li>No se encontraron productos...</li>"
          }

        })
      } else {
        searchList.innerHTML = null
      }
    }
  }
  searchBarDesktop.addEventListener('input', search(searchBarDesktop, searchResultDesktop))
  searchBar.addEventListener('input', search(searchBar, searchResult))
}