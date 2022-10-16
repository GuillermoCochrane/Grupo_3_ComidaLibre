import React, { useState } from 'react'
import { Redirect, Link, useParams } from 'react-router-dom'

const DeleteConfirm = () => {
  const [deletedMsg, setDeletedMsg] = useState('')
  const {id} = useParams();
  const deleteHandler = (e) => {
    e.preventDefault();
    let url = `http://localhost:3000/api/products/delete/${id}`
    fetch(url, {
      method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
      console.log(data)
      if(data.data === 1) {
        setDeletedMsg('Producto borrado')
      } else {
        setDeletedMsg('Error al borrar producto')
      }
    })
    .catch(errors => console.log(errors))
  }
  return (
    <div>
        {deletedMsg !== '' ?
          <>
            <h1>{deletedMsg}: {id}</h1> 
            <button><Link to='/'>Home</Link></button>
          </>
          :
          <>
            <h1>Estas seguro de eliminar producto: {id}</h1>
            <button onClick={deleteHandler}>Si</button>
            <button ><Link to={`/products/${id}`}>No</Link></button>  
          </>
        }
    </div>
  )
}

export default DeleteConfirm