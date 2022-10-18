import React,{Fragment} from 'react';
import { Link } from 'react-router-dom';

function UserRow(props) {
  return (
    <Fragment>
        <tr>
          <td>{props.id}</td>
          <td><Link to={`/users/${props.id}`}>{props.username}</Link></td>
          <td>{props.email}</td>
        </tr>
    </Fragment>
  )
}

export default UserRow;