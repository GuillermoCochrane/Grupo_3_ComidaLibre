import React from 'react';
import { Link } from 'react-router-dom';

function DetailEditDelete(props) {

  return (
    <div className="delete-edit-div">
        <Link to={`/edit/${props.id}`}>Editar</Link>
        <Link to={`/delete/${props.id}`}>Eliminar</Link>
    </div>
  )
}

export default DetailEditDelete