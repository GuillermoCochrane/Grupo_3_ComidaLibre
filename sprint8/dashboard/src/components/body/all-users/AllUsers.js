import React, {Fragment} from 'react'

function AllUsers() {
  return (
    <Fragment>
        <div class="allusers">
            <table>
                <caption>
                    USERS
                </caption>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>username</th>
                        <th>email</th>
                        <th>nombre</th>
                        <th>apellido</th>
                        <th>phone</th>
                        <th>address</th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td>1</td>
                        <td>@TESTUSER</td>
                        <td>test@gmail.com.ar</td>
                        <td>nombre</td>
                        <td>apellido</td>
                        <td>+54 9 2323910432</td>
                        <td>Fake st 123, colombia</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </Fragment>
    )
}

export default AllUsers