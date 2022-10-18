import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import './deleteConfirm.css'

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
      if(data.data === 1) {
        setDeletedMsg(data.meta.msg)
      } else {
        setDeletedMsg(data.meta.msg)
      }
    })
    .catch(errors => console.log(errors))
  }
  return (
    <div>
        {deletedMsg !== '' ?
          <div className='deleted-msg'>
            <h1 className={deletedMsg === 'Producto borrado' ? 'success-msg' : 'error-msg'}>
              {deletedMsg}
            </h1> 
            <button><Link to='/'>Home</Link></button>
          </div>
          :
          <div className='confirm-delete-msg'>
            <h1>¿ Estas seguro de eliminar producto: {id} ?</h1>
            <div className='btn-container'>
              <button onClick={deleteHandler}>Si</button>
              <button ><Link to={`/products/${id}`}>No</Link></button>  
            </div>
          </div>
        }
    </div>
  )
}

export default DeleteConfirm