// const app = require('express')();

// server connections
const express = require('express');
const proxy = require('express-http-proxy');
const request = require('request');

// port for voila instances
const voilaPort = process.env.voilaPort;
const listenPort = process.env.listenPort;
// for spawning new processes in windows shell
const spawn = require("child_process").spawn;
// const cmd = require('node-cmd');


// proxy new connections if they navigate to the 
const app = express();
app.use('/', handleNewUser());

function handleNewUser() {
    // get a unique id for the user
    var instanceID = getNewInstanceID();
    // start a voila server based on the 
    spawnVoilaInstance(instanceID);
    var proxyURL = 'http://localhost:' + voilaPort + '/voila/' + instanceID;
    proxy(proxyURL);
};
// function getNewInstanceID() {
//     // get number of instances
//     const fs = require('fs');
//     let rawData = fs.readFileSync('data.json');
//     let dataObj = JSON.parse(rawData);
//     let instances = dataObj.numInstances;

//     // validate data
//     if (typeof(instances) == int) {
//         // increase number of instances by one and write to file
//         ++instances;
//         dataObj = { instances: instances };
//         fs.writeFileSync('data.json', JSON.stringify(dataObj));
//         // Return the new number
//         return dataObj.instances + 1;
//     }
//     else {
//         console.log('node voila reverse proxy error: dataoj instances was not an integer');
//     }
// }
function getNewInstanceID(){
    const uuid = require('uuid/v4');
    return uuid();
}
function spawnVoilaInstance(userUUID) {
    // spawn a unique voila instance based on the user's uuid
    var voilaInstance = spawn('voila', ['"C:\\Sites\\Notebooks"', '--port='+port, '--no-browser', '--base_url="/voila/'+userUUID+'"']); 
    voilaInstance.on('exit', spawnVoilaInstance(userUUID));
    voilaInstance.on('error', function(err) {
        
    })
}