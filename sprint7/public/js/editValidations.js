window.onload = () => {
  let pathName = document.doctype.ownerDocument.location.pathname;
  switch (true) {
    case pathName.includes("/user/edit"):
      editUserValidation();
      break;
    case pathName.includes("/products/edit"):
      editProductValidation();
      break;
    case pathName.includes("/products/update"):
      editProductValidation();
      break;
    default:
      break;
  }
};
const editUserValidation = () => {
  let username = document.querySelector("#username");
  let image = document.querySelector("#image");
  let phone = document.querySelector("#phone");
  let email = document.querySelector("#email");
  let password = document.querySelector("#password");
  let rePassword = document.querySelector("#rePassword");
  let inputs = document.querySelectorAll("input");

  let errorUsername = document.querySelector("#error-username");
  let errorImage = document.querySelector("#error-image");
  let errorPhone = document.querySelector("#error-phone");
  let errorEmail = document.querySelector("#error-email");
  let errorPassword = document.querySelector("#error-password");
  let errorRePassword = document.querySelector("#error-rePassword");

  let btnSubmit = document.querySelector("#btn-submit");
  let editUserForm = document.querySelector("#edit-user-form");
  let editUserErrors = {};

  let toggleDisabled = (input) => {
    document
      .querySelector(`#btn-edit-${input.id}`)
      .addEventListener("click", (event) => {
        event.preventDefault();
        if(input.id === "password") {
          input.toggleAttribute("disabled");
          rePassword.toggleAttribute("disabled");
        } else {
          input.toggleAttribute("disabled");
        }
      });
  };
  for (let input of inputs) {
    if (input.id !== "key" && input.id !== "key-m" && input.id !== "rePassword") {
      toggleDisabled(input);
    }
  }

  let usernameValidations = () => {
    return () => {
      if (!validator.isLength(username.value, { min: 2 }) && username.disabled === false) {
        editUserErrors.username = "El usuario debe tener minimo 2 caracteres";
        errorUsername.innerHTML = "El usuario debe tener minimo 2 caracteres";
      } else {
        delete editUserErrors.username;
        errorUsername.innerHTML = "";
      }
    };
  };
  let emailValidations = () => {
    return () => {
      if (!validator.isEmail(email.value) && email.disabled === false) {
        editUserErrors.email = "El email no es valido";
        errorEmail.innerHTML = "El email no es valido";
      } else {
        delete editUserErrors.email;
        errorEmail.innerHTML = "";
      }
    };
  };
  let passwordValidations = () => {
    return () => {
      if (!validator.isStrongPassword(password.value) && password.disabled === false) {
        editUserErrors.password =
          "Constraseña debe tener minimo: 8 caracteres, 1 mayuscula, 1 minuscula y 1 simbolo";
        errorPassword.innerHTML =
          "Constraseña debe tener minimo: 8 caracteres, 1 mayuscula, 1 minuscula y 1 simbolo";
      } else {
        delete editUserErrors.password;
        errorPassword.innerHTML = "";
      }
    };
  };
  let rePasswordValidations = () => {
    return () => {
      if (rePassword.value.length === 0 && rePassword.disabled === false) {
        editUserErrors.rePassword = "Confirma la contraseña";
        errorRePassword.innerHTML = "Confirma la contraseña";
      } else if (
        rePassword.value !== password.value &&
        rePassword.disabled === false
      ) {
        editUserErrors.rePassword = "Las contraseñas no coinciden";
        errorRePassword.innerHTML = "Las contraseñas no coinciden";
      } else {
        delete editUserErrors.rePassword;
        errorRePassword.innerHTML = "";
      }
    };
  };
  let imageValidations = () => {
    return () => {
      let acceptedExt = ["png", "jpg", "jpeg", "gif"];
      if (image.value.length === 0) {
        delete editUserErrors.image;
        errorImage.innerHTML = "";
      } else {
        for (let file of image.files) {
          for (let ext of acceptedExt) {
            if (!file.type.includes(ext)) {
              editUserErrors.image = `Formato no admitido`;
              errorImage.innerHTML = `Formato no admitido`;
            } else {
              delete editUserErrors.image;
              errorImage.innerHTML = "";
              break;
            }
          }
        }
      }
    };
  };
  let phoneValidations = () => {
    return () => {
      if (!validator.isMobilePhone(phone.value) && image.disabled === false) {
        editUserErrors.phone =
          "Ingrese un numero de telefono valido (sin espacios ni guiones)";
        errorPhone.innerHTML =
          "Ingrese un numero de telefono valido (sin espacios ni guiones)";
      } else {
        delete editUserErrors.phone;
        errorPhone.innerHTML = "";
      }
    };
  };
  username.addEventListener("blur", usernameValidations());
  username.addEventListener("input", usernameValidations());
  email.addEventListener("blur", emailValidations());
  email.addEventListener("input", emailValidations());
  password.addEventListener("blur", passwordValidations());
  password.addEventListener("input", passwordValidations());
  rePassword.addEventListener("blur", rePasswordValidations());
  rePassword.addEventListener("input", rePasswordValidations());
  image.addEventListener("change", imageValidations());
  phone.addEventListener("blur", phoneValidations());
  phone.addEventListener("input", phoneValidations());

  btnSubmit.addEventListener("click", async (event) => {
    event.preventDefault();
    errorUsername.innerHTML = "";
    errorEmail.innerHTML = "";
    errorPassword.innerHTML = "";
    errorRePassword.innerHTML = "";
    for (let input of inputs) {
      if (input.value.length === 0 && input.disabled === false) {
        switch (input.id) {
          case "username":
            editUserErrors.username = "El campo es obligatorio";
            break;
          case "email":
            editUserErrors.email = "El campo es obligatorio";
            break;
          case "password":
            editUserErrors.password = "El campo es obligatorio";
            break;
          case "rePassword":
            editUserErrors.rePassword = "El campo es obligatorio";
            break;
          default:
            break;
        }
      }
    }
    let pathName = document.doctype.ownerDocument.location.pathname;
    let paramId = pathName.slice(11);
    if (!editUserErrors.username && username.disabled === false) {
      await fetch(`http://localhost:3000/api/users/username/${username.value}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.found === true && data.data.id != paramId) {
            editUserErrors.username = `${username.value} ya esta registrado`;
          }
        });
    }
    if (!editUserErrors.email && email.disabled === false) {
      await fetch(`http://localhost:3000/api/users/email/${email.value}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.found === true && data.data.id != paramId) {
            editUserErrors.email = `${email.value} ya esta registrado`;
          }
        });
    }
    if (Object.keys(editUserErrors).length !== 0) {
      errorUsername.innerHTML = editUserErrors.username
        ? editUserErrors.username
        : "";
      errorEmail.innerHTML = editUserErrors.email ? editUserErrors.email : "";
      errorPassword.innerHTML = editUserErrors.password
        ? editUserErrors.password
        : "";
      errorRePassword.innerHTML = editUserErrors.rePassword
        ? editUserErrors.rePassword
        : "";
    } else {
      editUserForm.submit();
    }
  });
};
const editProductValidation = () => {
  let name = document.querySelector("#name");
  let price = document.querySelector("#price");
  let category = document.querySelector("#idCat");
  let status = document.querySelector("#status");
  let discount = document.querySelector("#discount");
  let img = document.querySelector("#img");
  let description = document.querySelector("#description");

  let errorName = document.querySelector("#error-name")
  let errorPrice = document.querySelector("#error-price")
  let errorCategory = document.querySelector("#error-category")
  let errorStatus = document.querySelector("#error-status")
  let errorDiscount = document.querySelector("#error-discount")
  let errorImg = document.querySelector("#error-img")
  let errorDescription = document.querySelector("#error-description")
  
  let editBtn = document.querySelector("#edit-button")
  let editForm = document.querySelector("#edit-product-form")
  let editErrors = {}
  
  let inputs = document.querySelectorAll("input, select, textarea")
  let toggleDisabled = (input) => {
    document
      .querySelector(`#btn-edit-${input.id}`)
      .addEventListener("click", (event) => {
        event.preventDefault();
        input.toggleAttribute("disabled");
      });
  };
  for (let input of inputs) {
    toggleDisabled(input);
  }
  let nameValidations = () => {
    return () => {
      if (!validator.isLength(name.value, {min: 5}) && name.disabled === false) {
        editErrors.name = "Nombre del producto debe tener minimo 5 caracteres"
        errorName.innerHTML = "Nombre del producto debe tener minimo 5 caracteres"
      } else {
        delete editErrors.name
        errorName.innerHTML = ""
      }
    }
  }
  let priceValidations = () => {
    return () => {
      if (!validator.isNumeric(price.value) && price.disabled === false) {
        editErrors.price = "Precio debe ser un valor numerico"
        errorPrice.innerHTML = "Precio debe ser un valor numerico"
      } else {
        delete editErrors.price
        errorPrice.innerHTML = ""
      }
    }
  }
  let categoryValidations = () => {
    return () => {
      if (!validator.isInt(category.value, {min: 1, max: 4}) && category.disabled === false) {
        editErrors.category = "Debe seleccionar una opcion entre 1 y 4"
        errorCategory.innerHTML = "Debe seleccionar una opcion entre 1 y 4"
      } else {
        delete editErrors.category
        errorCategory.innerHTML = ""
      }
    }
  }
  let statusValidations = () => {
    return () => {
      if (!validator.isInt(status.value, {min: 1, max: 4}) && status.disabled === false) {
        editErrors.status = "Debe seleccionar una opcion entre 1 y 4"
        errorStatus.innerHTML = "Debe seleccionar una opcion entre 1 y 4"
      } else {
        delete editErrors.status
        errorStatus.innerHTML = ""
      }
    }
  }
  let discountValidations = () => {
    return () => {
      if (!validator.isInt(discount.value, {min: 0, max: 100}) && discount.disabled === false) {
        editErrors.discount = "El descuento debe ser un valor entre 0 y 100"
        errorDiscount.innerHTML = "El descuento debe ser un valor entre 0 y 100"
      } else {
        delete editErrors.discount
        errorDiscount.innerHTML = ""
      }
    }
  }
  let imgValidations = () => {
    return () => {
      let acceptedExt = ["png", "jpg", "jpeg", "gif"];
      if (img.value.length === 0) {
        delete editErrors.img;
        errorImg.innerHTML = "";
      } else {
        for (let file of img.files) {
          for (let ext of acceptedExt) {
            if (!file.type.includes(ext)) {
              editErrors.img = `Formato no admitido`;
              errorImg.innerHTML = `Formato no admitido`;
            } else {
              delete editErrors.img;
              errorImg.innerHTML = "";
              break;
            }
          }
        }
      }
    };
  };
  let descriptionValidations = () => {
    return () => {
      let charCount = document.querySelector("#char-count")
      charCount.innerHTML = `${description.value.length}`
      if (!validator.isLength(description.value, {max: 500}) && description.disabled === false) {
        charCount.style.color = "red" 
        editErrors.description = "Descripcion debe tener maximo 500 caracteres"
        errorDescription.innerHTML = "Descripcion debe tener maximo 500 caracteres"
      } else {
        charCount.style.color = "" 
        delete editErrors.description
        errorDescription.innerHTML = ""
      }
    }
  }

  name.addEventListener("blur", nameValidations())
  name.addEventListener("input", nameValidations())
  price.addEventListener("blur", priceValidations())
  price.addEventListener("input", priceValidations())
  category.addEventListener("change", categoryValidations())
  status.addEventListener("change", statusValidations())
  discount.addEventListener("change", discountValidations())
  discount.addEventListener("input", () => {
    document.querySelector("#rangevalue").innerHTML = `${discount.value}`
  })
  img.addEventListener("change", imgValidations())
  description.addEventListener("blur", descriptionValidations())
  description.addEventListener("input", descriptionValidations())

  editBtn.addEventListener("click", async (event) => {
    event.preventDefault();
    if (name.value.length === 0 && name.disabled === false) {
      editErrors.name = "El campo es obligatorio"
    }
    if (price.value.length === 0 && price.disabled === false) {
      editErrors.price = "El campo es obligatorio"
    }
    if (category.value.length === 0 && category.disabled === false) {
      editErrors.category = "El campo es obligatorio"
    }
    if (status.value.length === 0 && status.disabled === false) {
      editErrors.status = "El campo es obligatorio"
    }
    if(!editErrors.name && name.disabled === false) {
      await fetch(`http://localhost:3000/api/products/name/${name.value}`)
      .then(response => response.json())
      .then(data => {
        if(data.found === true) {
          editErrors.name = `(${name.value}) ya esta registrado`
        }
      });
    }
    console.log(editErrors)
    if (Object.keys(editErrors).length !== 0) {
      errorName.innerHTML = editErrors.name ? editErrors.name : "";
      errorPrice.innerHTML = editErrors.price ? editErrors.price : "";
      errorCategory.innerHTML = editErrors.category ? editErrors.category : "";
      errorStatus.innerHTML = editErrors.status ? editErrors.status : "";
    } else {
      editForm.submit();
    }
  })
};