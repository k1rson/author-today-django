const bannedUsernames = ['admin', 'moderator']

function isUsernameBanned(username) {
    const lowerCaseUsername = username.toLowerCase()

    for (const bannedUsername of bannedUsernames) {
        if (lowerCaseUsername.includes(bannedUsername)) {
            return false 
        }
    }

    return true
}

function updateButtonState() {
    const button = document.getElementById('button-registration');
    const loginInput = document.getElementById('login-input');
    const emailInput = document.getElementById('email-input');
    const passwordInput = document.getElementById('password-input');

    const isLoginValid = validateUsername(loginInput.value) && isUsernameBanned(loginInput.value);
    const isEmailValid = validateEmail(emailInput.value);
    const isPasswordValid = validatePassword(passwordInput.value);

    button.disabled = !(isLoginValid && isEmailValid && isPasswordValid);
}

function checkField(spinner, url, postData) {
    spinner.classList.remove('d-none');

    return new Promise((resolve, reject) => {
        let crsf_token = getCookie('csrftoken');
        $.ajax({
            url: url,
            type: 'POST',
            data: postData,
            contentType: false, 
            processData: false,
            beforeSend: function(xhr, settings){
                if (!csrfSafeMethod(settings.type) && !this.crossDomain){
                    xhr.setRequestHeader("X-CSRFToken", crsf_token); 
                }
            },
            success: function(response) {
                spinner.classList.add('d-none');
                if (response.status == 'success') {
                    resolve(false);
                } else {
                    resolve(true);
                }
            },
            error: function(status) {
                spinner.classList.add('d-none');
                callToast('Ошибка в работе сервера. Подробная информация: ' + status);
                reject(status);
            }
        });
    });
}

function checkUsername() {
    let input = document.getElementById('login-input') 
    let spinner = document.getElementById('spinner-login') 
    let successMark = document.getElementById('check-mark-success-login')
    let errorMark = document.getElementById('check-mark-error-login')

    let postData = new FormData();
    postData.append('username', input.value);

    if (!validateUsername(input.value) || !isUsernameBanned(input.value)) {
        successMark.classList.add('d-none');
        errorMark.classList.remove('d-none');
        input.classList.add('error');

        return;
    }

    checkField(spinner, 'check_login', postData)
    .then(isError => {
        if (isError) {
            errorMark.classList.add('d-none');
            successMark.classList.remove('d-none');
        } else {
            successMark.classList.add('d-none');
            errorMark.classList.remove('d-none');
            input.classList.add('error');
        }
    });

    updateButtonState();
}


function checkEmail() {
    let input = document.getElementById('email-input') 
    let spinner = document.getElementById('spinner-email') 
    let successMark = document.getElementById('check-mark-success-email')
    let errorMark = document.getElementById('check-mark-error-email')

    let postData = new FormData()
    postData.append('email', input.value)

    if(!validateEmail(input.value)){
        successMark.classList.add('d-none')
        errorMark.classList.remove('d-none')
        input.classList.add('error');

        return
    }

    checkField(spinner, 'check_email', postData)
    .then(isError => {
        if (isError) {
            errorMark.classList.add('d-none')
            successMark.classList.remove('d-none')
        } else {
            successMark.classList.add('d-none')
            errorMark.classList.remove('d-none')
            input.classList.add('error');
        }
    })

    updateButtonState()
}

function checkPassword() {
    let input = document.getElementById('password-input') 
    let spinner = document.getElementById('spinner-password') 
    let successMark = document.getElementById('check-mark-success-password')
    let errorMark = document.getElementById('check-mark-error-password')

    spinner.classList.remove('d-none')

    if(!validatePassword(input.value)){
        spinner.classList.add('d-none')
        successMark.classList.add('d-none')
        errorMark.classList.remove('d-none')
        
        input.classList.add('error');
        return
    }
    else{
        spinner.classList.add('d-none')
        errorMark.classList.add('d-none')
        successMark.classList.remove('d-none')
    }

    updateButtonState();
}

function registrUser(){
    let postData = new FormData();
    postData.append('username', $('#login-input').val());
    postData.append('password', $('#password-input').val());
    postData.append('email', $('#email-input').val());

    let crsf_token = getCookie('csrftoken')
    $.ajax({
        url: 'registr_user',
        type: 'POST',
        data: postData,
        contentType: false, 
        processData: false,
        beforeSend: function(xhr, settings){
            if(!csrfSafeMethod(settings.type) && !this.crossDomain){
                xhr.setRequestHeader("X-CSRFToken", crsf_token); 
            }
        },
        success: function(response) {
            window.location.href = '/'
        },
        error: function(status) {
            callToast('Ошибка в работе сервера. Подробная информация: ' + status)
        }
    });
}

// Вызов функции обновления состояния кнопки при изменении значений полей
$('#login-input, #email-input, #password-input').on('input', updateButtonState);