import React,{Fragment} from 'react'

function ProductHeader() {
  return (
    <Fragment>
        <tr>
            <th className='products-th'>id</th>
            <th className='products-th'>nombre</th>
            <th className='products-th'>precio</th>
            <th className='products-th'>category</th>
            <th className='products-th'>status</th>
        </tr>
    </Fragment>
  )
}

export default ProductHeader