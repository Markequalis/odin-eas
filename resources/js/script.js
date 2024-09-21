document.addEventListener('DOMContentLoaded', () => { // Added so that the script doesn't load until the page content does.
    const gridContainer = document.getElementById('board');
    const boardSizeButton = document.getElementById('boardSizeButton');
    const colorPicker = document.getElementById('color-control');
    const rainbowColorBtn = document.getElementById('rainbow');
    const resetButton = document.getElementById('resetButton');

    let useRandomColors = false;
    let painting = false;

    rainbowColorBtn.addEventListener('click', () => {
        useRandomColors = !useRandomColors;
        rainbowColorBtn.textContent = useRandomColors ? 'Rainbow Enabled' : 'Rainbow Disabled';
    });

    boardSizeButton.addEventListener('click', () => {
        const size = prompt('Enter a board size (16, 32, 48, 64, 80, 96): ', '16');
        const validSizes = [16, 32, 48, 64, 80, 96];
        const parsedSize = parseInt(size);

        if (size && validSizes.includes(parsedSize)) {
            generateGrid(parsedSize);
        } else {
            alert('Invalid size. Please enter one of the following values: 16, 32, 48, 64, 80, or 96.');
        }
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
    }

    document.addEventListener('mousedown', () => {
        painting = true;
    });

    document.addEventListener('mouseup', () => {
        painting = false;
    });

    function getRandomColor(opacity = 1) { // Random color generator
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return hexToRgba(color, opacity);
    }

    function hexToRgba(hex, opacity) {      // Changes the hex colors for the color picker into RGB
        let r = parseInt(hex.slice(1, 3), 16);
        let g = parseInt(hex.slice(3, 5), 16);
        let b = parseInt(hex.slice(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    }

    function paintSquare(square) {
        let opacity = parseFloat(square.dataset.opacity);
        opacity = Math.min(opacity + 0.1, 1); // Increment opacity, max 1
        square.dataset.opacity = opacity;

        if (useRandomColors) {
            square.style.backgroundColor = getRandomColor(opacity);
        } else {
            square.style.backgroundColor = hexToRgba(colorPicker.value, opacity);
        }
    }
    // Resets the board
    function resetBoard() {
        const squares = document.querySelectorAll('.square');
        squares.forEach(square => {
            square.style.backgroundColor = '';
            square.dataset.opacity = 0; 
        });
    }

    function getRandomDarkColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 8)]; // Uses only the first 8 characters to ensure dark colors
        }
        return color;
    }

    // Function to apply random dark color to the header
    function randomizeHeaderColor() {
        const headerTextElements = document.querySelectorAll('header h1, header p');
        headerTextElements.forEach(element => {
            element.style.color = getRandomDarkColor();
       });
    }      
    
    setInterval(randomizeHeaderColor, 1000);
    
    generateGrid(16);
});