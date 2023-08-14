function checkFields(inputId, spinnerID, successMarkId, errorMarkId, url, postData, buttonId){
    let button = document.getElementById(buttonId);
    let input = $(inputId)
    let spinner = $(spinnerID)
    let successMark = $(successMarkId)
    let errorMark = $(errorMarkId)

    spinner.removeClass('d-none')
    successMark.addClass('d-none');
    errorMark.addClass('d-none');

    let crsf_token = getCookie('csrftoken')
    $.ajax({
        url: url,
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
            if(response.status == 'success'){
                spinner.addClass('d-none');
                successMark.removeClass('d-none');

                button.disabled = false
            }
            else{
                spinner.addClass('d-none');
                errorMark.removeClass('d-none');
                input.addClass('error'); 

                button.disabled = true
            }
        },
        error: function(status) {
            callToast('Ошибка в работе сервера. Подробная информация: ' + status)
        }
    });

    input.removeClass('error')
}

function checkUsername() {
    let username = $('#login-input').val();

    let postData = new FormData(); 
    postData.append('username', username)

    checkFields('#login-input', '#spinner', '#check-mark-success', '#check-mark-error', 'check_login', postData, 'button-auth')
}

function checkPassword(){
    let username = $('#login-input').val();
    let password = $('#password-input').val(); 

    let postData = new FormData();
    postData.append('username', username)
    postData.append('password', password)

    checkFields('#password-input', '#spinner-ps', '#check-mark-success-ps', '#check-mark-error-ps', 'check_password', postData, 'button-auth')
}

function authorizationUser(){
    let postData = new FormData(); 
    postData.append('username', $('#login-input').val())    
    postData.append('password', $('#password-input').val()) 

    let crsf_token = getCookie('csrftoken')
    $.ajax({
        url: 'auth_user',
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

