window.onload = () => {
    let username = document.querySelector('#username');
    let email = document.querySelector('#email');
    let password = document.querySelector('#password');
    let rePassword = document.querySelector('#rePassword');
    let submitBtn = document.querySelector('#reg-button');
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

    let usernameValidation = () => {
        return () => {
            required(username);
            minCharacter(username, 2);
        }
    }

    let emailValidation = () => {
        let errorField = document.querySelector('#error-' + email.id);
        return () => {
            required(email);
            if(!validator.isEmail(email.value)){
                errorField.innerText = 'El email no es válido' ;
                errors.email = 'El email no es válido';
            }else{
                errorField.innerText = '';
                delete errors.email;
            }
        }
    }

    let passwordValidation = () => {
        let errorField = document.querySelector('#error-' + password.id);
        return () => {
            required(password);
            if(!validator.isStrongPassword(password.value)){
                errorField.innerText = 'La contraseña debe tener mínimo: 8 caracteres, 1 mayúscula, 1 minúscula, 1 número y 1 símbolo';
                errors.password = 'La contraseña debe tener mínimo: 8 caracteres, 1 mayúscula, 1 minúscula, 1 número y 1 símbolo';
            }else{
                errorField.innerText = '';
                delete errors.password;
            }
        }
    }

    let rePasswordValidation = () => {
        let errorField = document.querySelector('#error-' + rePassword.id);
        return () => {
            required(rePassword);
            if(rePassword.value !== password.value){
                errorField.innerText = 'Las contraseñas no coinciden';
                errors.rePassword = 'Las contraseñas no coinciden';
            }else{
                errorField.innerText = '';
                delete errors.rePassword;
            }
        }
    }

    username.addEventListener('keyup', usernameValidation());
    username.addEventListener('blur', usernameValidation());

    email.addEventListener('keyup', emailValidation());
    email.addEventListener('blur', emailValidation());

    password.addEventListener('keyup', passwordValidation());
    password.addEventListener('blur', passwordValidation());

    rePassword.addEventListener('keyup', rePasswordValidation());
    rePassword.addEventListener('blur', rePasswordValidation());

    submitBtn.addEventListener('click', async(event) => {
        event.preventDefault();

        required(username);
        required(email);
        required(password);
        
        if(!errors.username){
            await fetch(`http://localhost:3000/api/users/username/${username.value}`)
            .then(response => response.json())
            .then(data => {
                if(data.found === true){
                    let errorField = document.querySelector('#error-' + username.id);
                    errors.username = 'El usuario ' + username.value + ' ya se encuentra registrado';
                    errorField.innerText = 'El usuario ' + username.value + ' ya se encuentra registrado';
                }
            })
        }

        if(!errors.email){
            console.log(email.value)
            await fetch(`http://localhost:3000/api/users/email/${email.value}`)
            .then(response => response.json())
            .then(data => {
                if(data.found === true){
                    let errorField = document.querySelector('#error-' + email.id);
                    errors.email = 'El email ' + email.value + ' ya se encuentra registrado';
                    errorField.innerText = 'El email ' + email.value + ' ya se encuentra registrado';
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