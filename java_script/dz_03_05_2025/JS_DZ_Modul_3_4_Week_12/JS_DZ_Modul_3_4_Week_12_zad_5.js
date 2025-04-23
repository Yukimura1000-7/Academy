const table = document.getElementById('data-table');
const headers = table.querySelectorAll('th');

headers.forEach((header, index) => {
    header.addEventListener('click', () => {
        sortTable(index, header.dataset.type);
    });
});

function sortTable(columnIndex, type) {
    const rows = Array.from(table.querySelectorAll('tbody tr'));

    rows.sort((rowA, rowB) => {
        const cellA = rowA.cells[columnIndex].innerText.trim();
        const cellB = rowB.cells[columnIndex].innerText.trim();

        if (type === 'number') {
            return parseFloat(cellA) - parseFloat(cellB);
        } else {
            return cellA.localeCompare(cellB, 'ru');
        }
    });

    const tbody = table.querySelector('tbody');
    tbody.innerHTML = '';
    rows.forEach(row => tbody.appendChild(row));
}