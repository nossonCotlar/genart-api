const express = require('express');
const fs = require('fs');
const path = require('path');
require('dotenv').config();
const generate = require('./generate'); //returns a canvas generated from a seed

const app = express();

app.get('/', genart);
app.get('/:engine', genart);
app.get('/:engine/:seed', genart);

async function genart(req, res){
    try{
        res.type('png');

        let out = fs.createWriteStream('./out/exp.png');
        let theSeed;
        if(req.query.seed) theSeed = req.query.seed;
        else if(req.params.seed) theSeed = req.params.seed;
        else theSeed = Math.random();
        let stream = generate(theSeed, req.params.engine).createPNGStream();
        stream.pipe(out);
        out.on('finish', () => res.sendFile(path.join(__dirname, '/out/exp.png')));
        console.log(`Generated on engine: ${req.params.engine || process.env.DEFAULT_ENGINE}, using seed: ${theSeed}`);
    }
    catch(e){
        res.type('json');
        res.send({error: e});
    }
    
    
}

app.listen(process.env.PORT, () => console.log("We're gtg"));