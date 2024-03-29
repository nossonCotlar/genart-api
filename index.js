#!/usr/bin/env node

const express = require('express');
const cors = require('cors');
const subdomain = require('express-subdomain');
const fs = require('fs');
const path = require('path');
require('dotenv').config();
const {Storage} = require('@google-cloud/storage');
const randomstring = require('randomstring');
const generate = require('./generate'); //returns a canvas generated from a seed
const { urlencoded } = require('express');

//Google Storage stuff
const gc = new Storage({keyFilename: process.env.GCLOUD_KEY_FILE_PATH, projectId: process.env.GCLOUD_PROJECT_NAME});
const bucket = gc.bucket(process.env.GCLOUD_STORAGE_BUCKET);

const app = express();
const port = process.env.PORT;
const webapp_subdomain = process.env.WEBAPP_SUBDOMAIN;

console.log(webapp_subdomain);
app.use(cors());
app.use(subdomain(webapp_subdomain, express.static('webapp')));
app.get('/', genart); //will use the default engine, with an optional seed passed as a param
app.get('/:engine', genart);
app.get('/:engine/:seed', genart);

async function genart(req, res){
    //determine if synchronous
    let sync = req.query.sync;
    let embed = req.query.embed;

	res.setHeader('X-Powered-By', 'Cum');

    try{
        //find the seed
        let theSeed = req.query.seed || req.params.seed || randomstring.generate(10);
        let theEngine = req.query.engine || req.params.engine || process.env.DEFAULT_ENGINE;

        //determine cloud file path
        let cloudFilePath = `${theEngine}/${theSeed}.png`;
	    let cloudFile = bucket.file(cloudFilePath);

	    let exist = false;
	    cloudFile.exists().then( (data) => {
		    exist = data[0];
		    if(exist) sendStuff();
	    });

        //initialize write stream to cloud
        let out = cloudFile.createWriteStream({resumable: false});
        //generate the art canvas and make a png stream from it
        let stream;
	
        try{
            stream = generate(theSeed, theEngine).createPNGStream();
        
        } catch(e){
            console.error("whoops, something went wrong during generation");
            res.status(500).json({ error: e});
            return;
        }
	
	    
	    //pipe png stream into cloud
        stream.pipe(out);
        
        //define what to do when sending response
        function sendStuff(){
            res.status(200).json({
            seed: theSeed, 
            engine: theEngine,
            link: encodeURI(`${process.env.GCLOUD_STORAGE_ENDPOINT}/${cloudFilePath}`)
            });
        }

        //if the synchronous flag is set, only send once the art has been uploaded (slow)
        if(sync == 'true'){
            out.on('finish', sendStuff);
        }
        //if not just send the path and the art will be there eventually lol
        else {
            sendStuff();
        }
        
        console.log(`Generated on engine: ${theEngine}, using seed: ${theSeed}`);
    }
    catch(e){
        res.status(500).json({ error: e});
    }
}

app.listen(port, () => console.log(`We're gtg on ${port} :)`));
