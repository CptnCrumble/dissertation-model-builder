const express = require('express');
const prp = require('./src/preprocessing')

const app = express();
const port = 3000;
app.use(express.json());
app.use('/static',express.static('static'));

// UI pages ----------------------------------------------------
app.get("/",(req,res) => {
    res.sendFile(__dirname + '/pages/home.html');
})

// API endpoints -----------------------------------------------

app.get("/preprocessing/validData", (req,res) => {
    res.json(prp.validation.getValidData());
})

app.put("/preprocessing/validData", (req,res) => {
    try {
        prp.validation.putValidData(req.body);
        res.statusCode = 200;
    } catch (error) {
        console.log('error generating validated data: ' + error)
        res.statusCode = 400;
    }
})

app.put("/writeModel", (req,res) => {
    try {
        prp.write.writeData(req.body);
        res.statusCode = 200;
    } catch (error) {
        console.log('error writing model to server' + error)
        res.statusCode = 400;
    }
})

app.listen(port, () => console.log('app is up'));