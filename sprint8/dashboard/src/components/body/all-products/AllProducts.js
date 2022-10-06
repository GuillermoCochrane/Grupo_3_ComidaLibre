import React, {Fragment} from 'react'

function AllProducts() {
  return (
    <Fragment>
        <div class="allproducts">
            <table>
                <caption>
                    PRODUCTS
                </caption>

                <thead>
                    <tr>
                        <th>id</th>
                        <th>nombre</th>
                        <th>precio</th>
                        <th>category</th>
                        <th>status</th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td>1</td>
                        <td>product name</td>
                        <td>33.44</td>
                        <td>bebida</td>
                        <td>oferta</td>
                    </tr>
                </tbody>

            </table>
        </div>
    </Fragment>
  )
}

export default AllProducts