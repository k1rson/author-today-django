function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

function csrfSafeMethod(method) {
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}

function validateUsername(username) {
    if (username.length > 18) {
        return false
    }
    
    return true
}

function validateEmail(email){
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
}

function validatePassword(password) {
    const minLength = 8; // Минимальная длина пароля
    const uppercaseRegex = /[A-Z]/; // По крайней мере одна заглавная буква
    const lowercaseRegex = /[a-z]/; // По крайней мере одна строчная буква
    const digitRegex = /\d/; // По крайней мере одна цифра

    if (password.length < minLength) {
        return false; 
    }

    if (!uppercaseRegex.test(password)) {
        return false; 
    }

    if (!lowercaseRegex.test(password)) {
        return false; 
    }

    if (!digitRegex.test(password)) {
        return false; 
    }

    return true;
}

function callToast(message){
    let toastLiveExample = document.getElementById('liveToast');
    let toast_content = document.getElementById('toastContent');

    toast_content.innerText = message;

    let toast = new bootstrap.Toast(toastLiveExample);
    toast.show();
}