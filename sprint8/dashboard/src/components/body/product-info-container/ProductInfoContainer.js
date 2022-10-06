import React, {Fragment} from 'react'

function ProductInfoContainer() {
  return (
    <Fragment>
        <div className="product-info-container">
                    <div className="product-category-container">
                        <div className="card">
                            <p>category X</p>
                        </div>
                        <div className="card">
                            <p>category X</p>
                        </div>
                        <div className="card">
                            <p>category X</p>
                        </div>
                    </div>

                    <div className="product-status-container">
                        <div className="card">
                            <p>status X</p>
                        </div>
                        <div className="card">
                            <p>status X</p>
                        </div>
                        <div className="card">
                            <p>status X</p>
                        </div>
                    </div>
                </div>
    </Fragment>
  )
}

export default ProductInfoContainer