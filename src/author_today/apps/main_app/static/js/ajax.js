// DOM handler
$(document).ready(function() {
    GetBooks();
});

// get crsf token
function GetCookie(name) {
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

// pars crsf
function CRSFTokenSafe(method) {
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}

// ajax functions
function GetBooks() {
    $.ajax({
      url: '/ajax/books',
      type: 'GET',
      dataType: 'json',
      success: function(data) {
        CreateBookPanels(data.books_list, data.books_list, data.books_list, data.books_list, data.books_list, data.books_list, data.books_list, data.books_list)
      },
      error: function(xhr, status, error) {
        console.error('Произошла ошибка: ' + error);
      }
    });
}
