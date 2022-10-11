import React,{useState, useEffect} from 'react' 
import { useParams } from 'react-router-dom';

import './productDetail.css'
// let id = 1
function ProductDetail() {
    const [productDetail, setProductDetail] = useState([]);
    let {id} = useParams();

    useEffect(() => {
		
		const endpoint = `http://localhost:3000/api/products/${id}`
		
        fetch(endpoint)
        .then(response => response.json())
        .then(data => {
            setProductDetail(data);
        })
        .catch(error => console.log(error));
		
	}, []);
    const tipoDePlato = productDetail.relaciones[0].category 
    console.log(id)
    console.log(productDetail.relaciones[0].category)
    return (
        <main className="main-product-detail">
            {/*  */}
            <h1>Detalle del producto {productDetail.id}</h1>
            <article className="main-product">
                <img id="main-image" src={productDetail.imgURL}  alt={productDetail.name}/>
                <div className="main-detail">
                <h2 className="title0">{productDetail.name}</h2>
                {/* <% if(product.discount) {%>
                <div className="discount-div">
                    <p className="price-original">$<%= product.price %></p>
                    <p className="price">
                    $<%= (product.price-(product.price*(product.discount/100))).toFixed(2) %>
                    </p>
                </div>
                <p className="discount">-<%= product.discount %>% OFF</p>
                <% } else {%>
                    <p className="price">$<%= product.price %></p>
                <% } %> */}
                <p className="name">
                    <strong>Tipo de plato: </strong> {tipoDePlato}
                </p>
                <p className="name">
                    <strong>Tipo de plato: </strong> {tipoDePlato}
                </p>
                <p className="name">
                    <strong>Descripción: </strong> {productDetail.description}
                </p>
                <div className="delete-edit-div">
                    <form className="edit-btn" action={`/products/edit/${id}`} method="GET">
                    <button type="submit">Editar</button>
                    </form>
                    <form className="delete-btn" action={`/products${id}?_method=DELETE`} method="POST">
                    <button type="submit">Eliminar</button>
                    </form>
                </div>
                </div>
            </article>
        </main>
    )
}

export default ProductDetail