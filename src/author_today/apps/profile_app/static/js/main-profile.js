// DOM ready
$(document).ready(function() {
    loadingMainComponents()
});

function hidePlaceholder() {
    const placeholder = document.getElementById('inputPlaceholder')
    placeholder.style.opacity = '0'
}

function showPlaceholder() {
    const placeholder = document.getElementById('inputPlaceholder')

    const input = document.querySelector('.form-control')
    if (input.value.trim() !== '') {
        return
    }

    placeholder.style.opacity = '1'
}

function loadingMainComponents() {
    let username_box = document.getElementById('username')
    let role_box = document.getElementById('role')
    let exp_box = document.getElementById('exp')
    let lvl_box = document.getElementById('lvl')
    
    getInfoAboutUser(function(user_data) {
        console.log(user_data)

        if (user_data === undefined) {
            callToast('Ошибка в работе сервера. Подгрузка данных пользователя ограничена! Попробуйте позже!')
            window.location.href = '/'
            return
        }

        username_box.textContent = user_data.username

        setUserRole(role_box, user_data.role)
        setUserExpReader(exp_box, user_data.exp_reader, user_data.max_exp)
        setUserLevelReader(lvl_box, user_data.lvl_reader)

        // for writer
    });
}

function setUserRole(role_box, role) {
    const roles = {
        1: { name: 'Читатель', class: 'box-default-user' },
        2: { name: 'Писатель', class: 'box-writer-user' },
        3: { name: 'Модератор', class: 'box-moderator-user' },
        4: { name: 'Администратор', class: 'box-administrator-user' },
        5: { name: 'Спец. Администратор', class: 'box-special-administration-user' },
        6: { name: 'Тех. поддержка', class: 'box-support-user' },
        7: { name: 'Отдел маркетинга', class: 'box-marketing-department-user' },
        8: { name: 'Основатель', class: 'box-CEO-user' }
    };

    const selectedRole = roles[role];
    if (selectedRole) {
        role_box.textContent = selectedRole.name;
        role_box.classList.add(selectedRole.class);
    } 
}


function setUserExpReader(exp_box, exp, max_exp) {
    exp_box.textContent = `Опыт: ${exp}/${max_exp}`
    exp_box.classList.add('box-default-user')
}

function setUserLevelReader(lvl_box, lvl) {
    const levels = {
        1: { name: 'Начинающий читатель', class: 'box-default-user' },
        2: { name: 'Любознательный страничник', class: 'box-writer-user' },
        3: { name: 'Путешественник миров бумаги', class: 'box-moderator-user' },
        4: { name: 'Словесный исследователь', class: 'box-administrator-user' },
        5: { name: 'Строитель мира слов', class: 'box-special-administration-user' },
        6: { name: 'Мастер словесного искусства', class: 'box-support-user' },
        7: { name: 'Книжный знаток', class: 'box-marketing-department-user' },
        8: { name: 'Страж библиотеки', class: 'box-CEO-user' },
        9: { name: 'Хранитель мудрости книг', class: 'box-CEO-user' },
        10: { name: 'Литературный маг', class: 'box-CEO-user' },
        11: { name: 'Великий Читатель', class: 'box-CEO-user' },
    };

    const selectedLevel = levels[lvl];
    if (selectedLevel) {
        lvl_box.textContent = selectedLevel.name;
        lvl_box.classList.add(selectedLevel.class);
    } 
}

function getInfoAboutUser(callback) {
    let id = document.getElementById('user-id').textContent

    $.ajax({
        url: 'get_info_about_user/' + id,
        type: 'GET',
        contentType: false,
        processData: false,
        success: function(response) {
            if (response.status === 'success') {
                callback(response.data_user); 
            } else {
                callback(undefined); 
            }
        },
        error: function(status) {
            callToast('Ошибка в работе сервера. Подробная информация: ' + status);
        }
    });
}

function openModalWithInfoUser(){
    let myModal = new bootstrap.Modal(document.getElementById('modal-detail-info-user'))
    getInfoAboutUser(function(user_data) {
        console.log(user_data)

        if (user_data === undefined) {
            callToast('Ошибка в работе сервера. Подгрузка данных пользователя ограничена! Попробуйте позже!')
            window.location.href = '/'
            return
        }

        title = document.getElementById('modal-title')
        myModal.show()
    });
}