import React from 'react';

function DetailEditDelete(props) {
  const editHandler = (e) => {
    e.preventDefault();

  }

  const deleteHandler = (e) => {
    e.preventDefault();
    let url = `http://localhost:3000/api/products/delete/${props.id}`
    fetch(url, {
      method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(errors => console.log(errors))
  }
  const editProduct = (e) => {
    e.preventDefault();
    let formValues = new FormData(e.target)
    let formData = new FormData()
    for (let entry of formValues.entries()) {
      formData.append(entry[0], entry[1])
    }
    let url = `http://localhost:3000/api/products/edit/${props.id}`
    fetch(url, {
      method: 'PUT',
      body: formData
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(errors => console.log(errors))
  }

  return (
    <>
    <div className="delete-edit-div">
        <form className="edit-btn">
            <button type="submit">Editar</button>
        </form>
        <form onSubmit={deleteHandler} className="delete-btn">
            <button type="submit">Eliminar</button>
        </form>
    </div>
    <div className="main-edit-create">
      <form 
        id="create-product-form" 
        className="input-container-form" 
        onSubmit={editProduct}
        >

        <label for="name">
          <h4>Nombre del producto</h4>
        </label>
        <div className="info-container-div">
          <i className="fas fa-file-signature"></i>
          <input type="text" name="name" id="name" placeholder="ej: Milanesa con puré"/>
        </div>
        <small id="error-name" className="error-input">
          {/* <%= typeof errors != 'undefined' && errors.name ? errors.name.msg : null %> */}
        </small>

        <label for="price">
          <h4>Precio</h4>
        </label>
        <div className="info-container-div">
          <i className="fas fa-dollar-sign"></i>
          <input type="text" step="any" name="price" id="price" placeholder="ej: 00.00"/>
        </div>
        <small id="error-price" className="error-input">
          {/* <%= typeof errors != 'undefined' && errors.price ? errors.price.msg : null %> */}
        </small>

        <label for="idCat">
          <h4>Categoría</h4>
        </label>
        <div className="info-container-div">
          <i className="fas fa-clipboard-list"></i>
          <select name="idCat" id="idCat">
            <option value="" selected disabled hidden>Categoría</option>
            <option value="1">1-Entrada</option>
            <option value="2">2-Plato principal</option>
            <option value="3">3-Postre</option>
            <option value="4">4-Bebida</option>
          </select>
        </div>
        <small id="error-idCat" className="error-input">
          {/* <%= typeof errors != 'undefined' && errors.idCat ? errors.idCat.msg : null %> */}
        </small>

        <label for="status">
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
        <small id="error-status" className="error-input">
          {/* <%= typeof errors != 'undefined' && errors.status ? errors.status.msg : null %> */}
        </small>

        <label for="discount">
          <h4>Porcentaje de descuento: <spam id="rangevalue"></spam></h4>
        </label>
        <div className="info-container-div">
          <i className="fas fa-percent"></i>
          <input type="range" name="discount" id="discount" min="0" max="100" step="1" value="0"/>
        </div>
        <small id="error-discount" className="error-input">
          {/* <%= typeof errors != 'undefined' && errors.discount ? errors.discount.msg : null %> */}
        </small>

        <label for="img">
          <h4>Imagen del producto</h4>
        </label>
        <div className="info-container-div">
          <i className="fas fa-file-image"></i>
          <input className="img-input" type="file" id="img" name="img" />
        </div>
        <small id="error-img" className="error-input">
          {/* <%= typeof errors != 'undefined' && errors.img ? errors.img.msg : null %> */}
        </small>

        <label for="description">
          <h4>
            Descripción del producto
            <small id="char-count"></small>
          </h4>
        </label>
        <textarea name="description" id="description" cols="30" rows="5" placeholder="Descripción (max 500 caracteres)"></textarea>
        <small id="error-description" className="error-input">
          {/* <%= typeof errors != 'undefined' && errors.description ? errors.description.msg : null %> */}
        </small>

        <div className="btn-container">
          <button id="create-button" type="submit">Guardar</button>
          <button id="reset-button" type="reset">Borrar</button>
        </div>
      </form>
    </div>
    </>
    
  )
}

export default DetailEditDelete