import React, {Fragment} from 'react'
import '../all-users/allUsers.css'

function AllUsers() {
  return (
    <Fragment>
        <div class="allusers">
            <table className='users-table'>
                <caption>
                    USERS
                </caption>
                <thead>
                    <tr>
                        <th className='users-th'>id</th>
                        <th className='users-th'>username</th>
                        <th className='users-th'>email</th>
                        <th className='users-th'>nombre</th>
                        <th className='users-th'>apellido</th>
                        <th className='users-th'>phone</th>
                        <th className='users-th'>address</th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td className='users-td'>1</td>
                        <td className='users-td'>@TESTUSER</td>
                        <td className='users-td'>test@gmail.com.ar</td>
                        <td className='users-td'>nombre</td>
                        <td className='users-td'>apellido</td>
                        <td className='users-td'>+54 9 2323910432</td>
                        <td className='users-td'>Fake st 123, colombia</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </Fragment>
    )
}

export default AllUsers