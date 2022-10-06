import React, {Fragment} from 'react'
import '../product-info-container/productInfoContainer.css'

function ProductInfoContainer() {
    return (
            <Fragment>
                <div className="product-info-container">
                            <div className="product-category-container">
                                <div className="product-category-card">
                                    <p>category X</p>
                                </div>
                                <div className="product-category-card">
                                    <p>category X</p>
                                </div>
                                <div className="product-category-card">
                                    <p>category X</p>
                                </div>
                            </div>

                            <div className="product-status-container">
                                <div className="product-status-card">
                                    <p>status X</p>
                                </div>
                                <div className="product-status-card">
                                    <p>status X</p>
                                </div>
                                <div className="product-status-card">
                                    <p>status X</p>
                                </div>
                            </div>
                        </div>
            </Fragment>
)
}

export default ProductInfoContainer