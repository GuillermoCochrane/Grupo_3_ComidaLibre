import React from 'react';

function DetailEditDelete(props) {
  return (

    <div className="delete-edit-div">
        <form className="edit-btn" action={`/products/edit/${props.id}`} method="GET">
            <button type="submit">Editar</button>
        </form>
        <form className="delete-btn" action={`/products${props.id}?_method=DELETE`} method="POST">
            <button type="submit">Eliminar</button>
        </form>
    </div>
    
  )
}

export default DetailEditDelete