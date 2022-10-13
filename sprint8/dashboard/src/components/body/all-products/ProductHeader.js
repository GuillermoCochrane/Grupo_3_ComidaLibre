import React,{Fragment} from 'react';

function ProductHeader() {
  return (
    <Fragment>
        <tr>
            <th>Id</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Categoría</th>
            <th>Estado</th>
        </tr>
    </Fragment>
  )
}

export default ProductHeader;