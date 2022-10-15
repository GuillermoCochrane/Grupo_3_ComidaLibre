import React, { useState } from 'react'
import { Redirect, useParams } from 'react-router-dom'

const DeleteConfirm = () => {
  const [deleteStatus, setDeleteStatus] = useState(false)
  const {id} = useParams();
  const deleteHandler = (e) => {
    e.preventDefault();
    let url = `http://localhost:3000/api/products/delete/${id}`
    fetch(url, {
      method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
      if(data == 1) {
        setDeleteStatus(true)
      }
      console.log(data)
    })
    .catch(errors => console.log(errors))
  }
  return (
    <div>
        <h1>Estas seguro de eliminar producto: {id}</h1>
        {deleteStatus ? <small>Producto {id} fue borrado</small> : <></>}
        <button onClick={deleteHandler}>Si</button>
        <button onClick={() => <Redirect to={`/products/${id}`}/>}>No</button>  
    </div>
  )
}

export default DeleteConfirm