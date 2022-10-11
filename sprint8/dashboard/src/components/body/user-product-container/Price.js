import React, {Fragment} from 'react';

function Price(props) {
  return (
    <Fragment>
        {props.discount !== 0 && 
        <Fragment> 
            <div className="discount-div">
                <p className="price-original">
                    ${props.price}
                </p>
                <p className="price"> 
                    ${props.newPrice}
                </p>
            </div>
            <p className="discount">-{props.discount}% OFF</p>
        </Fragment>
        }
        
        {props.discount === 0   && <p className="price">${props.price}</p>}

    </Fragment>
  )
}

export default Price

