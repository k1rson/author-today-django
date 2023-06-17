$('.dropdown-hover').hover(function() {
    $(this).find('.dropdown-menu').stop(true, true).delay(100).fadeIn(200);
    
}, 
function() {
    $(this).find('.dropdown-menu').stop(true, true).delay(100).fadeOut(200);
});

function OpenModalForSearch(){
    alert('gg')
}

function OpenModalNotCompletedElement() {
    const modal = document.createElement('div');
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
  
  