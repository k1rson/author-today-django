// DOM elements/any functions on DOM elements
$('.dropdown-hover').hover(function() {
    $(this).find('.dropdown-menu').stop(true, true).delay(100).fadeIn(200);
    
}, 
function() {
    $(this).find('.dropdown-menu').stop(true, true).delay(100).fadeOut(200);
});

// custom functions 
function OpenModalForSearch(){
    alert('gg')
}

function OpenModalNotCompletedElement() {
    let modal = document.createElement('div');
    modal.classList.add('modal', 'fade');
    modal.id = 'modalnotcompletedelement';

    modal.innerHTML = `
    <div class="modal-dialog" role="document">
        <div class="modal-content">
        <div class="modal-header">
         <h5 class="modal-title centered-modal-title">Ошибка перехода</h5>
        </div>
        <div class="modal-body">
            <p>К сожалению, пока что не сделали :(</p>
        </div>
        </div>
    </div>
    `;

    document.body.appendChild(modal);

    $('#modalnotcompletedelement').modal('show');
}

function CreateBookPanels(popular_books, new_hot_books, updated_books, bestseller_books, last_check_books, new_books, popular_now_books, most_likes_books) {
    let popular_books_panel = $('#popularBooksPanel');
    popular_books_panel.empty();

    let bookCardsWrapper = $('<div>').addClass('book-cards-wrapper');

    popular_books.forEach(element => {
        let bookCard = $('<div>').addClass('book-card').html(`
            <div class="book-card mb-3">
                <div class="row justify-content-center align-items-center">
                    <div class="col-10">
                        <img src="${'media/' + element.avatar}" style="max-width: 105px;">
                    </div>
                </div>
                <div class="row justify-content-center align-items-center text-center">
                    <p class="bookcard-footer">${element.name}</p>
                    <p class="bookcard-footer">${element.author}</p>
                </div>
            </div>
        `);

        bookCardsWrapper.append(bookCard);
    });

    popular_books_panel.append(bookCardsWrapper);

    bookCardsWrapper.slick({
        infinite: true,
        speed: 500,
        slidesToShow: 7,
        slidesToScroll: 7,
        autoplaySpeed: 2000,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    });
}