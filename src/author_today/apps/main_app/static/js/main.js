// DOM handler
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
            <p>Находится в разработке</p>
        </div>
        </div>
    </div>
    `;

    document.body.append(modal);

    $('#modalnotcompletedelement').modal('show');
}

function CreateDashboardCard(){
    let dashboard_card = $('#dashboardCard');

}

function CreateBookPanels(popular_books, new_hot_books, updated_books, bestseller_books, last_check_books, new_books, popular_now_books, most_likes_books) {
    let popular_books_panel = $('#popularBooksPanel');
    let new_hot_books_panel = $('#newHotBooksPanel');
    let updated_books_panel = $('#updatedBooksPanel');
    let bestseller_books_panel = $('#bestsellerBooksPanel');
    let last_check_books_panel = $('#lastCheckBooksPanel');
    let new_books_panel = $('#newBooksPanel');
    let popular_now_books_panel = $('#popularNewBooksPanel');
    let most_likes_books_panel = $('#mostLikesBooksPanel');

    let wrapper_popular = CreateBooksCard(popular_books)
    popular_books_panel.append(wrapper_popular)
    SettingSlick(wrapper_popular)

    let wrapper_new_hot = CreateBooksCard(new_hot_books)
    new_hot_books_panel.append(wrapper_new_hot)
    SettingSlick(wrapper_new_hot)

    let wrapper_update = CreateBooksCard(updated_books)
    updated_books_panel.append(wrapper_update)
    SettingSlick(wrapper_update)

    let wrapper_bestseller = CreateBooksCard(bestseller_books)
    bestseller_books_panel.append(wrapper_bestseller)
    SettingSlick(wrapper_bestseller)

    let wrapper_last_check = CreateBooksCard(last_check_books)
    last_check_books_panel.append(wrapper_last_check)
    SettingSlick(wrapper_last_check)

    let wrapper_new_books = CreateBooksCard(new_books)
    new_books_panel.append(wrapper_new_books)
    SettingSlick(wrapper_new_books)

    let wrapper_popular_now = CreateBooksCard(popular_now_books)
    popular_now_books_panel.append(wrapper_popular_now)
    SettingSlick(wrapper_popular_now)

    let wrapper_most_likes= CreateBooksCard(most_likes_books)
    most_likes_books_panel.append(wrapper_most_likes)
    SettingSlick(wrapper_most_likes)
}

function CreateBooksCard(list_books){
    let bookCardsWrapper = $('<div>').addClass('book-cards-wrapper');

    list_books.forEach(element => {
        let bookCard = $('<div>').addClass('book-card').html(`
            <div class="book-card mb-3">
                <div class="row justify-content-center align-items-center">
                    <div class="col-10">
                        <a href="${element.id}"><img src="${'media/' + element.avatar}" style="max-width: 85px;"></a>
                    </div>
                </div>
                <div class="row justify-content-center align-items-center text-center">
                    <p class="bookcard-footer">${element.name}</p>
                    <p class="bookcard-footer text-muted">${element.author}</p>
                </div>
            </div>
        `);

        bookCardsWrapper.append(bookCard);
    });

    return bookCardsWrapper
}

function SettingSlick(book_panel_wrapper){
    book_panel_wrapper.slick({
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