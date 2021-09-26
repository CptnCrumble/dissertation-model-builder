const fs = require('fs');

function writeData(dataObject) {    
    let guid = dataObject['model_id'];
    let filename = `./data/${guid}.json`;
    
    fs.writeFile(filename,JSON.stringify(dataObject), function (err) {
        if (err) throw err;
        console.log('%s Saved!',filename);
      });    
}

module.exports = {
    writeData
}