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
