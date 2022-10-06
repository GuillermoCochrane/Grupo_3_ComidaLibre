import React,{Fragment} from 'react'

function UserHeader() {
  return (
    <Fragment>
        <th className='users-th'>id</th>
        <th className='users-th'>username</th>
        <th className='users-th'>email</th>
        <th className='users-th'>nombre</th>
        <th className='users-th'>apellido</th>
        <th className='users-th'>phone</th>
        <th className='users-th'>address</th>
    </Fragment>
  )
}

export default UserHeader



