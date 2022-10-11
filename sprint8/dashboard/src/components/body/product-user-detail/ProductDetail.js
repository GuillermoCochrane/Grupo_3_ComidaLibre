import React,{useState, useEffect} from 'react' 
import { useParams } from 'react-router-dom';
import DetailInfo from './DetailInfo';
import Price from './Price';
import DetailImg from './DetailImg';
import DetailTitle from './DetailTitle';
import DetailEditDelete from './DetailEditDelete';

import './productDetail.css'

function ProductDetail() {

    const [productDetail, setProductDetail] = useState([]);
    const {id} = useParams();
    let tipoDePlato = "Cargando"
    let status = "Cargando"
    let discount = 0
    let newprice = 0

    useEffect(() => {
		const endpoint = `http://localhost:3000/api/products/${id}`
		
        fetch(endpoint)
        .then(response => response.json())
        .then(data => {
            setProductDetail(data);
        })
        .catch(error => console.log(error));
		// eslint-disable-next-line
	}, []);
    

    if(productDetail.length !==0 ){
        tipoDePlato = productDetail.relaciones[0].category
        status = productDetail.relaciones[1].status
        discount = productDetail.discount
        newprice = productDetail.price-(productDetail.price*(discount/100)).toFixed(2)        
    }

    return (
        <main className="main-product-detail">

            <DetailTitle title='producto' id={productDetail.id} />

            {productDetail.lenght === 0 && <p>Cargando</p>}

            <article className="main-product">

                <DetailImg img={productDetail.imgURL} name={productDetail.name} />

                <div className="main-detail">
                    <h2 className="title0">
                        {productDetail.name}
                    </h2>

                    <Price price={productDetail.price} discount={discount} newPrice={newprice} />

                    <DetailInfo title='Tipo de plato: ' data={tipoDePlato} />

                    <DetailInfo title={status} />

                    <DetailInfo title='Descripción: ' data={productDetail.description}/>

                    <DetailEditDelete id={productDetail.id} />

                </div>
            </article>
        </main>
    )
}

export default ProductDetail