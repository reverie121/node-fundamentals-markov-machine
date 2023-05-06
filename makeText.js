/** Command-line tool to generate Markov text. */

const fs = require('fs');
const process = require('process');
const axios = require('axios');
const URL = require("url").URL;

const arg = process.argv
const MarkovMachine = require("./markov")

const inputType = arg[2];
const path = arg[3];

async function makeThatText() {
    if (inputType == 'file') {
        fs.readFile(path,'utf8', (error, data) => {
            if (error) {
                console.error(error);
                process.exit(1);
            }
            const mm = new MarkovMachine(data);
            console.log(mm.makeText());
        });
    }
    else if (inputType == 'url') {
        try {
            const response = await axios.get(path);
            const mm = new MarkovMachine(response.data);
            console.log(mm.makeText());
        }
        catch(error) {
            console.error(`Error reading ${path}: ${error}`);
            process.exit(1);            
        }
    }
    else {
        console.log('first parameter must be file or url')
        process.kill(1)
    }
}

makeThatText();