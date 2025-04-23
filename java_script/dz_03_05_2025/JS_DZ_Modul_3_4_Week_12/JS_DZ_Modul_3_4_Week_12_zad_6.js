const box = document.getElementById('resizable-box');
const handle = document.getElementById('resize-handle');

let isResizing = false;

handle.addEventListener('mousedown', (event) => {
    isResizing = true;

    const onMouseMove = (e) => {
        if (!isResizing) return;

        const newWidth = e.clientX - box.getBoundingClientRect().left;
        const newHeight = e.clientY - box.getBoundingClientRect().top;

        box.style.width = `${newWidth}px`;
        box.style.height = `${newHeight}px`;
    };

    const onMouseUp = () => {
        isResizing = false;

        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup', onMouseUp);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
});