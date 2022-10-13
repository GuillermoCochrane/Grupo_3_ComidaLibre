import React,{Fragment} from 'react';

function UserHeader() {
  return (
    <Fragment>
        <th>Id</th>
        <th>Usuario</th>
        <th>Email</th>
        <th>Nombre</th>
        <th>Apellido</th>
        <th>Teléfono</th>
        <th>Dirección</th>
    </Fragment>
  )
}

export default UserHeader;