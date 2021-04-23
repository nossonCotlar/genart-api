const seedrandom = require('seedrandom');
const { createCanvas, loadImage } = require('canvas');



function generate(seed, engine){
    seedrandom(seed, { global: true });

    let generator;
    try{
        generator = require(`../engines/${engine}.js`); //load correct generator engine
    }
    catch(e){
        console.error(`Having some trouble fetching the ${engine} engine`);
        throw `Couldn't find the ${engine} engine`;
    }
    let canvas;
    try{
        canvas = createCanvas(500, 500);
        return generator(canvas, seed);
    } catch(e){
        console.log(e);
        throw('Yikes, something went wrong. Email us and we\'ll look into it.');
    }
    
}

module.exports = generate;
