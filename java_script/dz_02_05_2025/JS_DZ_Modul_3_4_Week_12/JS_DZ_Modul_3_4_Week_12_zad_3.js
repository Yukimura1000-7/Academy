const bookList = document.getElementById('book-list');
const books = Array.from(bookList.children);

let lastSelectedIndex = null;
let selectedBooks = new Set();

bookList.addEventListener('click', (event) => {
    const clickedBook = event.target;
    const clickedIndex = books.indexOf(clickedBook);

    if (!clickedBook || clickedIndex === -1) return;

    if (!event.ctrlKey && !event.shiftKey) {
        books.forEach((book, index) => {
            book.classList.remove('selected');
            selectedBooks.delete(index);
        });

        clickedBook.classList.add('selected');
        selectedBooks.add(clickedIndex);
        lastSelectedIndex = clickedIndex;
    }

    if (event.ctrlKey) {
        if (selectedBooks.has(clickedIndex)) {
            clickedBook.classList.remove('multi-selected');
            selectedBooks.delete(clickedIndex);
        } else {
            clickedBook.classList.add('multi-selected');
            selectedBooks.add(clickedIndex);
        }
    }

    if (event.shiftKey && lastSelectedIndex !== null) {
        const start = Math.min(lastSelectedIndex, clickedIndex);
        const end = Math.max(lastSelectedIndex, clickedIndex);

        for (let i = start; i <= end; i++) {
            const book = books[i];
            book.classList.add('multi-selected');
            selectedBooks.add(i);
        }
    }

    lastSelectedIndex = clickedIndex;
});