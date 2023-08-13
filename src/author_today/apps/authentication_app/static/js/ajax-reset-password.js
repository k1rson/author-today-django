function removeElement(element) {
    if (element) {
        element.remove();
    }
}

function animateAndRemove(element, targetElement) {
    element.classList.add('animated-remove');
    element.addEventListener('animationend', function () {
        removeElement(element);
        targetElement.classList.remove('d-none');
        targetElement.classList.add('animated-create');
    });
}

function checkPossibilityReset() {
    let cntEmail = document.getElementById('container-email');
    let cntConfirmPerson = document.getElementById('container-confirm-person');
    let labelInfr = document.getElementById('label-infr');
    let labelUsername = document.getElementById('label-username');
    let avatar = document.getElementById('avatar');
    let button = document.getElementById('confritm-reset-btn');
    let checkmarkError = document.getElementById('check-mark-error')

    let postData = new FormData();
    postData.append('email', $('#email-input').val());

    cash_email = $('#email-input').val()

    let crsf_token = getCookie('csrftoken');
    $.ajax({
        url: 'check_possibility_reset',
        type: 'POST',
        data: postData,
        contentType: false,
        processData: false,
        beforeSend: function (xhr, settings) {
            if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                xhr.setRequestHeader("X-CSRFToken", crsf_token);
            }
        },
        success: function (response) {
            if (response.status == 'success') {
                animateAndRemove(cntEmail, cntConfirmPerson);
                animateAndRemove(labelInfr, cntConfirmPerson);
                animateAndRemove(button, cntConfirmPerson);

                if(response.data.avatar_url != undefined){
                    avatar.src = response.data.avatar_url;
                }

                labelUsername.textContent = response.data.username;
            } else {
                checkmarkError.classList.remove('d-none');
            }
        },
        error: function (status) {
            callToast('Ошибка в работе сервера. Подробная информация: ' + status);
        }
    });
}

function resetPassword() {
    let cntConfirmPerson = document.getElementById('container-confirm-person');
    let cntSpinnerLoaded = document.getElementById('container-spinner-loaded');
    let cntSuccessMark = document.getElementById('container-success-mark');
    let cntErrorMark = document.getElementById('container-error-mark');

    animateAndRemove(cntConfirmPerson, cntSpinnerLoaded);

    let postData = new FormData();
    postData.append('email', cash_email);

    console.log(cash_email)

    let crsf_token = getCookie('csrftoken');
    $.ajax({
        url: 'reset_password_user',
        type: 'POST',
        data: postData,
        contentType: false,
        processData: false,
        beforeSend: function (xhr, settings) {
            if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                xhr.setRequestHeader("X-CSRFToken", crsf_token);
            }
        },
        success: function (response) {
            if (response.status == 'success') {
                animateAndRemove(cntSpinnerLoaded, cntSuccessMark);
            } else {
                animateAndRemove(cntSpinnerLoaded, cntErrorMark);
            }
        },
        error: function (status) {
            callToast('Ошибка в работе сервера. Подробная информация: ' + status);
        }
    });
}

let cash_email; 