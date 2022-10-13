import React,{Fragment} from 'react';
import { Link } from 'react-router-dom';

function UserRow(props) {
  return (
    <Fragment>
        <tr>
          <td>{props.id}</td>
          <td><Link to={`/users/${props.id}`}>{props.username}</Link></td>
          <td>{props.email}</td>
          <td>{props.first_name}</td>
          <td>{props.last_name}</td>
          <td>{props.phone}</td>
          <td>{props.address}</td>
        </tr>
    </Fragment>
  )
}

export default UserRow;