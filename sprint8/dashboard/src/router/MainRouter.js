import React, {Fragment} from 'react';
import Main from '../components/body/Main';
import AllProducts from '../components/body/all-products/AllProducts';
import AllUsers from '../components/body/all-users/AllUsers';
import ProductDetail from '../components/body/product-user-detail/ProductDetail';
import SearchContainer from '../components/body/search-container/SearchContainer'
import UserDetail from '../components/body/product-user-detail/UserDetail';
import NotFound from '../components/body/NotFound';
import CreateProduct from '../components/body/createProduct/CreateProduct';

import { Route, Switch } from 'react-router-dom';

function MainRouter(){

    return(
        <Fragment>         
            <Switch>
                <Route path="/" exact>
                    <Main/>
                </Route>

                <Route path="/products/" exact>
                    <AllProducts />
                </Route>

                <Route path="/products/:id" exact>
                    <ProductDetail />
                </Route>

                <Route path="/users/" exact>
                    <AllUsers />
                </Route>

                <Route path="/users/:id" exact>
                    <UserDetail />
                </Route>

                <Route path="/create/" exact>
                    <CreateProduct />
                </Route>

                <Route path="/search/" exact>
                    <SearchContainer/>
                </Route>


                <Route component={NotFound}/>

            </Switch>
        </Fragment>
    )
}

export default MainRouter;