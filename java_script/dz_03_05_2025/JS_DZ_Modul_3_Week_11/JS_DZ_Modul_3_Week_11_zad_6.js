function createTooltip(button) {
    const tooltipText = button.getAttribute('data-tooltip');
    const tooltip = document.createElement('div');
    tooltip.classList.add('tooltip');
    tooltip.textContent = tooltipText;

    button.appendChild(tooltip);

    button.addEventListener('mouseenter', () => {
        tooltip.style.opacity = '1';

        const rect = button.getBoundingClientRect();
        const tooltipHeight = tooltip.offsetHeight;

        if (rect.top - tooltipHeight < 0) {
            tooltip.classList.remove('top');
            tooltip.classList.add('bottom');
        } else {
            tooltip.classList.remove('bottom');
            tooltip.classList.add('top');
        }
    });

    button.addEventListener('mouseleave', () => {
        tooltip.style.opacity = '0';
    });
}

document.querySelectorAll('button[data-tooltip]').forEach(createTooltip);