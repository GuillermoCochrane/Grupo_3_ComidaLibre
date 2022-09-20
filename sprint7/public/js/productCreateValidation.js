window.onload = () => {
    let name = document.querySelector('#name');
    let price = document.querySelector('#price');
    let idCat = document.querySelector('#idCat');
    let status = document.querySelector('#status');
    let discount = document.querySelector('#discount');
    let img = document.querySelector('#img');
    let description = document.querySelector('#description');
    let createBtn = document.querySelector('#create-button');
    let form = document.querySelector('form'); 

    let errors = {};

    let required = (field) => {
        let errorField = document.querySelector('#error-' + field.id);
        if(validator.isEmpty(field.value)){
            errorField.innerText = 'El campo ' + field.id + ' es obligatorio';
            errors.field = 'El campo ' + field.id + ' es obligatorio';
        }else{
            errorField.innerText = '';
            delete errors.field;
        }
    }

    let minCharacter = (field,num) => {
        let errorField = document.querySelector('#error-' + field.id);
        if(!validator.isLength(field.value, {min:num})){
            errorField.innerText = 'El campo ' + field.id + ' debe tener al menos ' + num + ' caracteres';
            errors.field = 'El campo ' + field.id + ' debe tener al menos ' + num + ' caracteres';
        }else{
            errorField.innerText = '';
            delete errors.field;
        }
    }

    let nameValidation = () => {
        return () => {
            required(name);
            minCharacter(name, 5);
        }
    }

    let priceValidation = () => {
        return () => {
            let errorField = document.querySelector('#error-' + price.id);
            required(price);
            if(!validator.isNumeric(price.value)){
                errorField.innerText = 'El precio debe ser numérico' ;
                errors.price = 'El precio debe ser numérico';
            }else{
                errorField.innerText = '';
                delete errors.price;
            }
        }
    }

    let idCatValidation = () => {
        return () => {
            let errorField = document.querySelector('#error-' + idCat.id);
            required(idCat);
            if(!validator.isInt(idCat.value, {min: 1, max:4})){
                errorField.innerText = 'Esta categoría no está permitida' ;
                errors.idCat = 'Esta categoría no está permitida';
            }else{
                errorField.innerText = '';
                delete errors.idCat;
            }
        }
    }

    let statusValidation = () => {
        return () => {
            let errorField = document.querySelector('#error-' + status.id);
            required(status);
            if(!validator.isInt(status.value, {min: 1, max:4})){
                errorField.innerText = 'Este estado no está permitido' ;
                errors.status = 'Este estado no está permitido';
            }else{
                errorField.innerText = '';
                delete errors.status;
            }
        }
    }

    let discountValidation = () => {
        return () => {
            let errorField = document.querySelector('#error-' + discount.id);
            required(discount);
            if(!validator.isInt(discount.value, {min: 0, max:100})){
                errorField.innerText = 'El descuento debe ser entre 0 y 100' ;
                errors.discount = 'El descuento debe ser entre 0 y 100';
            }else{
                errorField.innerText = '';
                delete errors.discount;
            }
        }
    }

    let imgValidation = () => {
        return () => {
          let acceptedExt = ["png", "jpg", "jpeg", "gif"];
          if (img.value.length === 0) {
            delete errors.img;
            errorImg.innerHTML = "";
          } else {
            for (let file of img.files) {
              for (let ext of acceptedExt) {
                if (!file.type.includes(ext)) {
                  errors.img = `Formato no admitido`;
                  errorImg.innerHTML = `Formato no admitido`;
                } else {
                  delete errors.image;
                  errorImg.innerHTML = "";
                  break;
                }
              }
            }
          }
        };
      };

    let descriptionValidation = () => {
        return () => {
            let errorField = document.querySelector('#error-' + description.id);
            if(description.value.length > 500){
                errorField.innerText = 'La descripción no puede tener más de 500 caracteres';
                errors.rePassword = 'La descripción no puede tener más de 500 caracteres';
            }else{
                errorField.innerText = '';
                delete errors.description;
            }
        }
    }

    name.addEventListener('keyup', nameValidation());
    name.addEventListener('blur', nameValidation());

    price.addEventListener('keyup', priceValidation());
    price.addEventListener('blur', priceValidation());

    idCat.addEventListener('keyup', idCatValidation());
    idCat.addEventListener('blur', idCatValidation());

    status.addEventListener('keyup', statusValidation());
    status.addEventListener('blur', statusValidation());

    discount.addEventListener('keyup', discountValidation());
    discount.addEventListener('blur', discountValidation());

    img.addEventListener('change', imgValidation());

    description.addEventListener('keyup', descriptionValidation());
    description.addEventListener('blur', descriptionValidation());

    createBtn.addEventListener('click', async(event) => {
        event.preventDefault();

        required(name);
        required(price);
        required(status);
        //required(idCat);
        
        if(!errors.name){
            await fetch(`http://localhost:3000/api/products/name/${name.value}`)
            .then(response => response.json())
            .then(data => {
                if(data.found === true){
                    let errorField = document.querySelector('#error-' + name.id);
                    errors.name = 'El producto ' + name.value + ' ya existe';
                    errorField.innerText = 'El producto ' + name.value + ' ya existe';
                }
            })
        }

        if (Object.keys(errors).length != 0) {
            //alert('Faltan campos por completar');
        }else{
            form.submit();
        }
    })
}