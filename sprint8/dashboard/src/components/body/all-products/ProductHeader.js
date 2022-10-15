import React,{Fragment} from 'react';

function ProductHeader() {
  return (
    <Fragment>
        <tr>
            <th>Id</th>
            <th>Nombre</th>
            <th>Categoría</th>
        </tr>
    </Fragment>
  )
}

export default ProductHeader;