function checkFields(inputId, spinnerId, successMarkId, errorMarkId, buttonId, url, postdata){  
    let input = $(inputId); 
    let spinner = $(spinnerId);
    let successMark = $(successMarkId);
    let errorMark = $(errorMarkId);
    let button = document.getElementById(buttonId);

    spinner.removeClass('d-none');
    successMark.addClass('d-none');
    errorMark.addClass('d-none');

    let crsf_token = getCookie('csrftoken')
    $.ajax({
        url: url,
        type: 'POST',
        data: postdata,
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

                button.disabled = true; 
            }
            else{
                spinner.addClass('d-none');
                errorMark.removeClass('d-none');
                input.addClass('error'); 

                button.disabled = false
            }
        },
        error: function(status) {
            callToast('Ошибка в работе сервера. Подробная информация: ' + status)
        }
    });
}

function checkUsername(){
    let postData = new FormData();
    postData.append('username', $('#login-input').val()); 

    checkFields('#login-input', '#spinner', '#check-mark-success', '#check-mark-error', 'button-registr', 'check_login', postData)
}

function checkEmail() {
    let input = $('#email-input')
    let spinner = $('#spinner-email',)
    let successMark = $('#check-mark-success-em')
    let errorMark = $('#check-mark-error-em')
    let button = document.getElementById('button-registr');

    spinner.removeClass('d-none')
    successMark.addClass('d-none');
    errorMark.addClass('d-none');

    if(validateEmail(input.val())){
        let postData = new FormData();
        postData.append('email', input.val());

        checkFields('#email-input', '#spinner-email', '#check-mark-success-em', '#check-mark-error-em', 'button-registr', 'check_email', postData)
    }
    else{
        spinner.addClass('d-none');
        errorMark.removeClass('d-none');
        input.addClass('error'); 

        button.disabled = true
    }
}

function checkPassword() {
    let spinner = $('#spinner-ps',)
    let successMark = $('#check-mark-success-ps')
    let errorMark = $('#check-mark-error-ps')
    let button = document.getElementById('button-registr');

    spinner.removeClass('d-none');
    successMark.addClass('d-none');
    errorMark.addClass('d-none');

    let password = $('#password-input').val();
    
    if(validatePassword(password)){
        successMark.removeClass('d-none');
        spinner.addClass('d-none');

        button.disabled = false; 
    }
    else{
        spinner.addClass('d-none');
        successMark.addClass('d-none');
        errorMark.removeClass('d-none');

        button.disabled = true; 
    }
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

