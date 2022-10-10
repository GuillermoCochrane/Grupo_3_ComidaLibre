import React,{Fragment} from 'react'
import { Link } from 'react-router-dom';

function UserRow(props) {
  return (
    <Fragment>
        <tr>
          <td className='users-td'>{props.id}</td>
          <td className='users-td'><Link to={`/users/${props.id}`}>{props.username}</Link></td>
          <td className='users-td'>{props.email}</td>
          <td className='users-td'>{props.first_name}</td>
          <td className='users-td'>{props.last_name}</td>
          <td className='users-td'>{props.phone}</td>
          <td className='users-td'>{props.address}</td>
        </tr>
    </Fragment>
  )
}

export default UserRow