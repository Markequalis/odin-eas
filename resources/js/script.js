document.addEventListener('DOMContentLoaded', () => { // Added so that the script doesn't load until the page content does.
    const gridContainer = document.getElementById('board');
    const rows = 16;
    const cols = 16;

    for (let i = 0; i < rows * cols; i++) {  // This creates the squares for the grid.
        const gridItem = document.createElement('div');
        gridItem.className = 'square';
        gridItem.style.width = `${squareSize}px`;
        gridItem.style.height = `${squareSize}px`;
        gridContainer.appendChild(gridItem);
    }
});