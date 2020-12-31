const simp = require('simplex-noise');

module.exports = (canvas, seed) => {
    ctx = canvas.getContext('2d');
    noise = new simp(seed);
    let nxs = Math.random() * 100, nys = Math.random() * 100;
    let nxdense = rand(0.5, 1), nydense = rand(0.5, 1);
    let namp = rand(20, 200);


    let amt = Math.floor(rand(10, 75));
    //let amt = 2;
    let gaph = canvas.height / amt;
    let colors = [];
    let colAmt = Math.floor(Math.random() * 30);
    let colRange = Math.floor(rand(3, 360));
    let colStart = Math.floor(rand(0, 360));
    let colGap = colRange / colAmt;
    let lightness = Math.floor(rand(40, 80));
    let saturation = Math.floor(rand(50, 100));
    for(let i = 0; i < colRange; i += colGap){
        colors.push(`hsla(${colStart + i}, ${saturation}%, ${lightness}%, 1)`);
    }


    ctx.lineWidth = 3;

    for(let i = 0; i < amt; i++){
        let ys = gaph * i;
        let x = 0;

        while(x < canvas.width){
            let ny = map(ys, 0, canvas.height, 0, nydense);
            let nx = map(x, 0, canvas.width, 0, nxdense);
            let v = noise.noise2D(nx, ny);
            let y = ys + v * namp;

            ctx.strokeStyle = colors[Math.floor(Math.random() * colors.length)];
            ctx.beginPath();
            ctx.moveTo(x, y);
            x += Math.floor(rand(3, 20));

            ny = map(ys, 0, canvas.height, 0, nydense);
            nx = map(x, 0, canvas.width, 0, nxdense);
            v = noise.noise2D(nx, ny);
            y = ys + v * namp;

            ctx.lineTo(x, y);
            ctx.stroke();
            x += Math.floor(rand(3, 10))
            
        }


    }

    return canvas;
};

function rand(min, max){
    return Math.random() * (max - min) + min;
}
function randCol(){
    return `hsla(${Math.random() * 360}, ${Math.floor(rand(50, 100))}%, ${Math.floor(rand(25, 75))}%, 1)`;
}
function map(value, istart, istop, ostart, ostop){
    return ostart + (ostop - ostart) * ((value - istart) / (istop - istart));
}