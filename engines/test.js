module.exports = (canvas, seed) => {
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = '50px Arial';
    ctx.fillStyle = 'rgba(0, 0, 255, 1)';
    ctx.textAlign = 'center';
    ctx.fillText(seed, canvas.width / 2, canvas.height / 2);
    return canvas;
}