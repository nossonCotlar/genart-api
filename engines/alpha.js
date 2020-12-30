module.exports = generate;

function generate(canvas, seed){
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.lineWidth = Math.random() * 6 + 2;
    
    let amt = Math.random() * 30;
    let hueStart = Math.random() * 360;
    let hueStop = Math.random() * 360;
    let hue = hueStart;
    let hueInc = (hueStop - hueStart) / amt;
    
    for(let i = 0; i < amt; i++){
        ctx.beginPath();
        ctx.strokeStyle = `hsla(${hue}, 100%, 50%, 100)`;
        ctx.fillStyle = `hsla(${hue}, 100%, 50%, 100)`;
        hue += hueInc;

        ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
        let lineType = Math.floor(Math.random() * 4);
        switch(lineType){
            case 1:
                ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height); 
                break;
            case 2:
                ctx.bezierCurveTo(Math.random() * canvas.width, 
                Math.random() * canvas.height, 
                Math.random() * canvas.width, 
                Math.random() * canvas.height, 
                Math.random() * canvas.width, 
                Math.random() * canvas.height);
                break;
            case 3:
                ctx.quadraticCurveTo(Math.random() * canvas.width, 
                Math.random() * canvas.height, 
                Math.random() * canvas.width, 
                Math.random() * canvas.height);
                break;
            case 4:
                ctx.arcTo(Math.random() * canvas.width, 
                Math.random() * canvas.height, 
                Math.random() * canvas.width, 
                Math.random() * canvas.height, 
                Math.random() * 100);
                break;
        }
        
        if(Math.random() > 0.8) ctx.fill();
        else ctx.stroke();
    }
    return canvas
}