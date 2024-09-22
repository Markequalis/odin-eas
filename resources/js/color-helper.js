let useRandomColors = false;

const toggleRainbowColors = (button) => {
    useRandomColors = !useRandomColors;
    button.textContent = useRandomColors ? 'Rainbow Enabled' : 'Rainbow Disabled';
};

const hexToRgba = (hex, opacity) => {
    let r = parseInt(hex.slice(1, 3), 16);
    let g = parseInt(hex.slice(3, 5), 16);
    let b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

const getRandomDarkColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 8)]; // Uses only the first 8 characters to ensure dark colors
    }
    return color;
};

export { toggleRainbowColors, useRandomColors, hexToRgba, getRandomDarkColor };