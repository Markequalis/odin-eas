import * as colorHelper from './color-helper.js'

document.addEventListener('DOMContentLoaded', () => { // Added so that the script doesn't load until the page content does.
    const gridContainer = document.getElementById('board');
    const boardSizeButton = document.getElementById('boardSizeButton');
    const colorPicker = document.getElementById('color-control');
    const rainbowColorBtn = document.getElementById('rainbow');
    const resetButton = document.getElementById('resetButton');

    let painting = false;

    rainbowColorBtn.addEventListener('click', () => colorHelper.toggleRainbowColors(rainbowColorBtn));

    boardSizeButton.addEventListener('click', () => {
        const validSizes = [16, 32, 48, 64, 80, 96];
        let size;
        let parsedSize;

        do {
            size = prompt('Enter a board size (16, 32, 48, 64, 80, 96): ', '16');
            parsedSize = parseInt(size);
            if (!size || !validSizes.includes(parsedSize)) {
                alert('Invalid size. Please enter one of the following values: 16, 32, 48, 64, 80, or 96.');
            }
        } while (!size || !validSizes.includes(parsedSize));
        
        generateGrid(parsedSize);
    });

    resetButton.addEventListener('click', resetBoard);

    function generateGrid(size) {
        // Clears the board.
        gridContainer.innerHTML = '';
        
        const containerWidth = gridContainer.clientWidth;
        const containerHeight = gridContainer.clientHeight;
        const area = containerWidth * containerHeight; // Calculate the area of the board
        const totalSquares = size * size; // Total number of squares
        const squareSize = Math.sqrt(area / totalSquares); // Calculate square size based on area and total squares

        for (let i = 0; i < totalSquares; i++) {
            const div = document.createElement('span');
            div.classList.add('square');
            div.style.width = `${squareSize}px`;
            div.style.height = `${squareSize}px`;
            div.dataset.opacity = 0; // Initialize opacity

            div.addEventListener('mousedown', function () {
                painting = true;
                paintSquare(div);
            });
    
            div.addEventListener('mouseover', function () {
                if (painting) {
                    paintSquare(div);
                }
            });
    
            gridContainer.appendChild(div);
        }
    
        // Add mousedown and mouseup event listeners to the document only once
        document.addEventListener('mousedown', () => {
            painting = true;
        });
    
        document.addEventListener('mouseup', () => {
            painting = false;
        });
    }

    function paintSquare(square) {
        let opacity = parseFloat(square.dataset.opacity);
        opacity = Math.min(opacity + 0.1, 1); // Increment opacity, max 1
        square.dataset.opacity = opacity;

        if (colorHelper.useRandomColors) {
            square.style.backgroundColor = colorHelper.getRandomColor(opacity);
        } else {
            square.style.backgroundColor = colorHelper.hexToRgba(colorPicker.value, opacity);
        }
    }

    function resetBoard() { // Resets the board
        const squares = document.querySelectorAll('.square');
        squares.forEach(square => {
            square.style.backgroundColor = '';
            square.dataset.opacity = 0; 
        });
    }

    function headerColors() {   // Controls the header text RGB
        function randomizeHeaderColor() { // Function to apply random dark color to the header
            const headerTextElements = document.querySelectorAll('header h1, header p');
            headerTextElements.forEach(element => {
                element.style.color = colorHelper.getRandomDarkColor();
            });
        }
        randomizeHeaderColor();
        setInterval(randomizeHeaderColor, 1000)
    }
    generateGrid(16)
    headerColors();
});