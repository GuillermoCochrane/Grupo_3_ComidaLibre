import React, { useState, useEffect } from 'react'
import './createEditProduct.css'
import { Link, useParams } from 'react-router-dom'

const CreateProduct = (props) => {
  const { id } = useParams();
  const [productData, setProductData] = useState([])

  useEffect(() => {
    if(props.mode === 'edit') {
      fetch(`http://localhost:3000/api/products/${id}`)
        .then(response => response.json())
        .then(data => {
          setProductData(data);
          console.log(data)
        })
        .catch(error => console.log(error));
    } else {
      setProductData([])
    }
  },[props.mode])

  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState('')
  const [disabledToggle, setDisabledToggle] = useState(0)

  const createForm = (e) => {
    e.preventDefault();
    let formValues = new FormData(e.target)
    let formData = new FormData()
    for (let entry of formValues.entries()) {
      formData.append(entry[0], entry[1])
    }
    let url = "http://localhost:3000/api/products/create"
    fetch(url, {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      if(data.errors) {
        setErrors(data.errors)
      } else {
        setSuccess(data.meta.msg)
        setErrors({})
      }
    })
    .catch(errors => console.log(errors))
  }
  const editForm = (e) => {
    e.preventDefault();
    let formValues = new FormData(e.target)
    let formData = new FormData()
    for (let entry of formValues.entries()) {
      formData.append(entry[0], entry[1])
    }
    let url = `http://localhost:3000/api/products/edit/${id}`
    fetch(url, {
      method: 'PUT',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      if(data.errors) {
        setErrors(data.errors)
      } else {
        setSuccess(data.meta.msg)
        setErrors({})
      }
    })
    .catch(errors => console.log(errors))
  }
  const toggle = (e) => {
    e.preventDefault();
    disabledToggle === 1 ? setDisabledToggle(0) : setDisabledToggle(1)
  }

  return (
    <>
    {success !== '' ?
      <div className='success-msg'>
        <h1>{success}</h1>
        {props.mode === 'create' ?
          <div>
            <button onClick={()=> setSuccess('')}>Crear otro</button>
            <button><Link to='/'>Home</Link></button>
          </div>
         :
          <div>
            <button><Link to='/'>Home</Link></button>
          </div>
         }

      </div>
      :
      <div className="main-edit-create">
        <form 
        id="create-product-form" 
        className="input-container-form" 
        onSubmit={props.mode && props.mode === 'create' ? createForm : editForm}
        >
        <div className='create-edit-title'>
          {props.mode === 'create' ? 
            <h2>Crear un producto</h2>
          :
            <>
              <h2>Editar un producto</h2>
              <button onClick={toggle}><i className="fas fa-edit"></i></button>
            </>
          }
        </div>
        <label htmlFor="name">
          <h4>Nombre del producto</h4>
        </label>
        <div className="info-container-div">
          <i className="fas fa-file-signature"></i>
          <input 
            type="text" 
            name="name" 
            id="name" 
            placeholder="ej: Milanesa con puré"
            defaultValue={props.mode === 'edit' ? productData.name : null}
            disabled={props.mode === 'create' || disabledToggle === 1 ? false : true}/>
        </div>
        {errors && errors.name ? 
          <small id="error-name" className="error-input">{errors.name.msg}</small> 
          : 
          <></> 
        }

        <label htmlFor="price">
          <h4>Precio</h4>
        </label>
        <div className="info-container-div">
          <i className="fas fa-dollar-sign"></i>
          <input 
            type="text" 
            step="any" 
            name="price" 
            id="price" 
            placeholder="ej: 00.00" 
            defaultValue={props.mode === 'edit' ? productData.price : null}
            disabled={props.mode === 'create' || disabledToggle === 1 ? false : true}/>
        </div>
        {errors && errors.price ? 
          <small id="error-price" className="error-input">{errors.price.msg}</small> 
          : 
          <></>
        }

        <label htmlFor="idCat">
          <h4>Categoría</h4>
        </label>
        <div className="info-container-div">
          <i className="fas fa-clipboard-list"></i>
          <select name="idCat" id="idCat">
            <option value='' selected disabled hidden>Categoría</option>
            <option value="1">1-Entrada</option>
            <option value="2">2-Plato principal</option>
            <option value="3">3-Postre</option>
            <option value="4">4-Bebida</option>
          </select>
        </div>
        {errors && errors.idCat ? 
          <small id="error-idCat" className="error-input">{errors.idCat.msg}</small> 
          : 
          <></>
        }

        <label htmlFor="status">
          <h4>Estado de producto</h4>
        </label>
        <div className="info-container-div">
          <i className="fas fa-clipboard-list"></i>
          <select name="status" id="status">
            <option value="" selected disabled hidden>Estado</option>
            <option value="1">1-Novedad</option>
            <option value="2">2-Oferta</option>
            <option value="3">3-Recomendado</option>
            <option value="4">4-Más vendido</option>
          </select>
        </div>
        {errors && errors.status ? 
          <small id="error-status" className="error-input">{errors.status.msg}</small> 
          : 
          <></>
        }

        <label htmlFor="discount">
          <h4>Porcentaje de descuento: <span id="rangevalue"></span></h4>
        </label>
        <div className="info-container-div">
          <i className="fas fa-percent"></i>
          <input 
            type="range" 
            name="discount" 
            id="discount" 
            min="0" 
            max="100" 
            step="1"
            defaultValue={props.mode === 'edit' ? productData.discount : '0'}
            disabled={props.mode === 'create' || disabledToggle === 1 ? false : true}/>
        </div>
        {errors && errors.discount ? 
          <small id="error-discount" className="error-input">{errors.discount.msg}</small> 
          : 
          <></>
        }

        <label htmlFor="img">
          <h4>Imagen del producto</h4>
        </label>
        <div className="info-container-div">
          <i className="fas fa-file-image"></i>
          <input className="img-input" type="file" id="img" name="img" disabled={props.mode === 'create' || disabledToggle === 1 ? false : true}/>
        </div>
        {errors && errors.img ? 
          <small id="error-img" className="error-input">{errors.img.msg}</small> 
          : 
          <></>
        }

        <label htmlFor="description">
          <h4>
            Descripción del producto
            <small id="char-count"></small>
          </h4>
        </label>
        <textarea 
          name="description" 
          id="description" 
          cols="30" 
          rows="5" 
          placeholder="Descripción (max 500 caracteres)"
          defaultValue={props.mode === 'edit' ? productData.description : null}  
          disabled={props.mode === 'create' || disabledToggle === 1 ? false : true}></textarea>
        {errors && errors.description ? 
          <small id="error-description" className="error-input">{errors.description.msg}</small> 
          : 
          <></>
        }

        <div className="btn-container">
          <button id="create-button" type="submit">Guardar</button>
          <button id="reset-button" type="reset">Borrar</button>
        </div>
      </form>
    </div>
    }
  </>
  )
}

export default CreateProduct