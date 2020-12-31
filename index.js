#!/usr/bin/env node

const express = require('express');
const fs = require('fs');
const path = require('path');
require('dotenv').config();
const {Storage} = require('@google-cloud/storage');
const randomstring = require('randomstring');
const generate = require('./generate'); //returns a canvas generated from a seed
const { urlencoded } = require('express');

//Google Storage stuff
const gc = new Storage({keyFilename: 'genart-key.json', projectId: 'genart-299908'});
const bucket = gc.bucket(process.env.GCLOUD_STORAGE_BUCKET);

const app = express();

app.get('/', genart); //will use the default engine, with an optional seed passed as a param
app.get('/:engine', genart);
app.get('/:engine/:seed', genart);

async function genart(req, res){
    try{
        //find the seed
        let theSeed;
        let theEngine = req.query.engine || req.params.engine || process.env.DEFAULT_ENGINE;
        if(req.query.seed) theSeed = req.query.seed;
        else if(req.params.seed) theSeed = req.params.seed;
        else theSeed = randomstring.generate();


        let out = bucket.file(`${theEngine}-${theSeed}.png`).createWriteStream({resumable: false});
        let stream = generate(theSeed, theEngine).createPNGStream();
        stream.pipe(out);
        res.type('json').status(200).json({
            seed: theSeed, 
            engine: theEngine,
            link: encodeURI(`${process.env.GCLOUD_STORAGE_ENDPOINT}/${theEngine}-${theSeed}.png`)
        });
        console.log(`Generated on engine: ${theEngine}, using seed: ${theSeed}`);
    }
    catch(e){
        res.type('json').status(500).json({ error: e});
    }
    
    
}

app.listen(process.env.PORT, () => console.log("We're gtg"));