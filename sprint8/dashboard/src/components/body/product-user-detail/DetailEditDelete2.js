import React from 'react';
import { Link } from 'react-router-dom';

function DetailEditDelete(props) {
  return (

    <div className="delete-edit-div">
      <Link to={`/edit/${props.id}`}>
        <div className="edit-btn" >
            <button type="submit">Editar</button>
        </div>
        </Link>
        <Link to={`/delete/${props.id}`}>
        <div className="delete-btn" >
            <button type="submit">Eliminar</button>
        </div>
        </Link>
    </div>
    
  )
}

export default DetailEditDelete