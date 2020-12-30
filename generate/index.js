const seedrandom = require('seedrandom');
const { createCanvas, loadImage } = require('canvas');



function generate(seed, engine){
    seedrandom(seed, { global: true });

    if(!engine){
        engine = process.env.DEFAULT_ENGINE;
    }
    try{
        let generator = require(`../engines/${engine}.js`); //load correct generator engine
        
        let canvas = createCanvas(500, 500);
        return generator(canvas, seed);
    } catch(e){
        console.error(e);
        throw `Couldnt find the requested engine: ${engine}`;
    }
    
}

module.exports = generate;