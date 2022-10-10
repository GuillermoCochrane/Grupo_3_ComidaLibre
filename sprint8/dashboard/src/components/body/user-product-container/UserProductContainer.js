import React, {Fragment} from 'react'
import './userProductContainer.css'
import LastProduct from './last-product/LastProduct'
import LastUser from './last-user/LastUser'

function UserProductContainer() {
    return (
        <Fragment>
            <div className="user-product-container">
                <div className="last-user-container">
                    <LastUser/>
                </div>

                <div className="last-product-container">
                    <LastProduct/>
                </div>
            </div>
        </Fragment>
    )
}


export default UserProductContainer