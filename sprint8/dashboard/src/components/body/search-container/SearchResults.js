import React from 'react'

function SearchResults(props) {
  let price = (props.price-(props.price*(props.discount/100))).toFixed(2)
  return (
          <article className="main-article">
            <img src={`http://localhost:3000/images/products/${props.image}`} alt={ props.name } />
            <div className="product-detail">
              <h5 className="product-name"> { props.name } </h5>            
              <p className="search-price">
                $ {price}
              </p>
              { props.discount && <p className="search-discount">-%{props.discount}</p> }
              <div className="buttons">
                <form className="form-detail" action={`/products/${props.id}`}>
                  <button type="submit" className="btn-detail">Ver detalle</button>
                </form>
              </div>
            </div>
          </article>
          )
}

export default SearchResults