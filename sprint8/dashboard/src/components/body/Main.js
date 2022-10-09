import React, {Fragment} from 'react';
import StatsContainer from './stats-container/StatsContainer';
import ProductInfoContainer from './product-info-container/ProductInfoContainer';
import UserProductContainer from './user-product-container/UserProductContainer';
import AllProducts from './all-products/AllProducts';
import AllUsers from './all-users/AllUsers';
import './main.css';



function Main(){

    return(
        <Fragment>

                {/* <div className="main-content">                     */}

                    <StatsContainer/>

                    <ProductInfoContainer/>

                    <UserProductContainer/>

                    <AllProducts/>

                    <AllUsers/>

                {/* </div>                */}

        </Fragment>
    )

}

export default Main