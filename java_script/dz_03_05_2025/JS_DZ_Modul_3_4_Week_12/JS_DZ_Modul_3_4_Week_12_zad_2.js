document.getElementById('directory-tree').addEventListener('click', (event) => {
    const clickedItem = event.target;

    if (clickedItem.tagName === 'LI' && clickedItem.querySelector('ul')) {
        clickedItem.classList.toggle('collapsed');
    }
});