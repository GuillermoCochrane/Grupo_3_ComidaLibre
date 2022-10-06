import React,{Fragment} from 'react'
import { Link } from 'react-router-dom';

function ProductList(props) {
    return (
        <Fragment>
                <tr>
                    <td className='products-td'>{props.id}</td>
                    <td className='products-td'><Link to={`/products/${props.id}`}>{props.name}</Link></td>
                    <td className='products-td'>{props.price}</td>
                    <td className='products-td'>{props.category}</td>
                    <td className='products-td'>{props.status}</td>
                </tr>
        </Fragment>
)
}

export default ProductList