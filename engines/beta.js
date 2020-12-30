const simp = require('simplex-noise');
//const TWO_PI = 6.28318530718;

module.exports = (canvas, seed) => {
    const ctx = canvas.getContext('2d');
    ctx.lineWidth = 2;
    //ctx.translate(canvas.width / 2, canvas.height / 2);
    let noise = new simp(seed);
    let nxs = Math.random() * 100;
    let nys = Math.random() * 100;
    let nyi = rand(0.01, 0.1);
    let nxi = rand(0.01, 0.1);
    let colStart = Math.random() * 360, colStop = Math.random() * 360;
    //let nxi = 0.08, nyi = 0.08;

    let grainw = Math.floor(rand(1, 12));
    let grainh = Math.floor(rand(1, 12));
    
    let sizew = canvas.width / grainw;
    let sizeh = canvas.height / grainh;

    let gapw = rand(2, sizew / 7);
    let gaph = rand(2, sizeh / 7);

    let ny = nys;
    for(let i = 0; i < grainh; i++){
        let nx = nxs;
        let y = i * sizeh + gaph * 1.5;
        for(let j = 0; j < grainw; j++){

            let v = noise.noise2D(nx, ny);
            let x = j * sizew + gapw * 1.5;

            

            let decide = Math.random();
            if(decide < 0.05) {
                ctx.fillStyle = randCol();
                ctx.beginPath();
                ctx.moveTo(x + Math.random() * (sizew - gapw), y + Math.random() * (sizeh - gaph));
                
                let amt = rand(3, 6);
                for(let k = 0; k < amt; k++){
                    ctx.lineTo(x + Math.random() * (sizew - gapw), y + Math.random() * (sizeh - gaph));
                }
                ctx.fill();
            }
            else if(decide < 0.1){
                let thresh = 10;
                let x1 = x;
                let y1 = y;
                let x2 = x + sizew - gapw;
                let y2 = y + sizeh - gaph;

                ctx.moveTo(x1, y1);
                ctx.lineTo(x2 + map(Math.random(), 0, 1, -thresh, thresh), y1 + map(Math.random(), 0, 1, -thresh, thresh));
                ctx.lineTo(x2 + map(Math.random(), 0, 1, -thresh, thresh), y2 + map(Math.random(), 0, 1, -thresh, thresh));
                ctx.lineTo(x1 + map(Math.random(), 0, 1, -thresh, thresh), y2 + map(Math.random(), 0, 1, -thresh, thresh));
                ctx.closePath();

                ctx.strokeStyle = randCol();
                ctx.stroke();
                
            }
            else{
                let col;
                let thresh = rand(4, 15);
                let x1 = x;
                let y1 = y;
                let x2 = x + sizew - gapw;
                let y2 = y + sizeh - gaph;
                if(Math.random() < 0.3){
                    col = ctx.createLinearGradient(
                        Math.random() * sizew, 
                        Math.random() * sizeh, 
                        Math.random() * sizew, 
                        Math.random() * sizeh);
                    let colAmt = rand(3, 5);
                    for(let ii = 0; ii < colAmt; ii++){
                        col.addColorStop(Math.random(), 
                        `hsla(${Math.random() * 360}, ${Math.floor(rand(50, 100))}%, ${map(v, -1, 1, 5, 100)}%, 1)`);
                    }
                }
                else {
                    col = `hsla(${map(v, -1, 1, colStart, colStop)}, 50%, 50%, 1)`;
                }

                ctx.beginPath();
                ctx.moveTo(x1, y1);
                ctx.lineTo(x2 + map(Math.random(), 0, 1, -thresh, thresh), y1 + map(Math.random(), 0, 1, -thresh, thresh));
                ctx.lineTo(x2 + map(Math.random(), 0, 1, -thresh, thresh), y2 + map(Math.random(), 0, 1, -thresh, thresh));
                ctx.lineTo(x1 + map(Math.random(), 0, 1, -thresh, thresh), y2 + map(Math.random(), 0, 1, -thresh, thresh));
                ctx.closePath();
                ctx.fillStyle = col; 
                if(Math.random() < 0.5) ctx.fill();
                else ctx.stroke();
            };

            nx += nxi;
        }
        ny += nyi;
    }
    
    return canvas;
}

function rand(min, max){
    return Math.random() * (max - min) + min;
}
function randCol(){
    return `hsla(${Math.random() * 360}, ${Math.floor(rand(50, 100))}%, ${Math.floor(rand(25, 75))}%, 1)`;
}
function map(value, istart, istop, ostart, ostop){
    return ostart + (ostop - ostart) * ((value - istart) / (istop - istart));
}