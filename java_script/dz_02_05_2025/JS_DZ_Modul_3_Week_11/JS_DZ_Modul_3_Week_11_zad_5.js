const bookList = document.getElementById('book-list');
const books = Array.from(bookList.children);

let currentSelectedBook = null;

bookList.addEventListener('click', (event) => {
    const clickedBook = event.target;

    if (!clickedBook || !books.includes(clickedBook)) return;

    if (currentSelectedBook) {
        currentSelectedBook.classList.remove('selected');
    }

    if (currentSelectedBook === clickedBook) {
        currentSelectedBook = null;
    } else {
        clickedBook.classList.add('selected');
        currentSelectedBook = clickedBook;
    }
});