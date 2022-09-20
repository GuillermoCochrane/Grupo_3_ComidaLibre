window.onload = () => {
    let emailUser = document.querySelector('#emailUser');
    let password = document.querySelector('#password');
    let logBtn = document.querySelector('#log-button');
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

    let emailUserValidation = () => {
        return () => {
            required(emailUser);
        }
    }

    let passwordValidation = () => {
        return () => {
            required(password);
        }
    }

    emailUser.addEventListener('input', emailUserValidation());
    emailUser.addEventListener('blur', emailUserValidation());

    password.addEventListener('keyup', passwordValidation());
    password.addEventListener('blur', passwordValidation());

    logBtn.addEventListener('click', async(event) => {
        event.preventDefault();

        required(emailUser);
        required(password);

        if (Object.keys(errors).length != 0) {
            //alert('Faltan campos por completar');
        }else{
            form.submit();
        }
    })
}