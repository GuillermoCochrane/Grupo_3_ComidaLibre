import React,{Fragment} from 'react';
import { Link } from 'react-router-dom';

function ProductRow(props) {
    return (
        <Fragment>
                <tr>
                    <td>{props.id}</td>
                    <td><Link to={`/products/${props.id}`}>{props.name}</Link></td>
                    <td>{props.price}</td>
                    <td>{props.mainRelation.category}</td>
                    <td>{props.status}</td>
                </tr>
        </Fragment>
)
}

export default ProductRow;