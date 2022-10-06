import React from 'react';
import Main from '../components/body/Main';
import AllProducts from '../components/body/all-products/AllProducts';
import AllUsers from '../components/body/all-users/AllUsers';
import NotFound from '../components/body/NotFound';

import { Route, Switch } from 'react-router-dom';

function MainRouter(){

    return(
        <React.Fragment>         
            <Switch>
                <Route path="/" exact>
                    <Main/>
                </Route>

                <Route path="/products/" exact>
                    <AllProducts />
                </Route>

                <Route path="/products/:id" exact>
                    <AllProducts />
                </Route>

                <Route path="/users/" exact>
                    <AllUsers />
                </Route>

                <Route path="/users/:id" exact>
                    <AllUsers />
                </Route>

                <Route component={NotFound}/>

            </Switch>
        </React.Fragment>
    )
}

export default MainRouter;