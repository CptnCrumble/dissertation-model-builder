const express = require('express');
const prp = require('./src/preprocessing')

const app = express();
const port = 3000;
app.use(express.json());
app.use('/static',express.static('static'));

app.get("/",(req,res) => {
    res.sendFile(__dirname + '/pages/home.html');
})

app.get("/preprocessing/dataSpec", (req,res) => {
    res.json(prp.dataSpec.getDataSpec());
})

app.put("/preprocessing/dataSpec", (req,res) => {
    try {
        prp.dataSpec.putDataSpec(req.body);
        res.statusCode = 200;
    } catch (error) {
        console.log('error updating data spec: '+ error);
        res.statusCode = 400;
    }
})

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

app.get("/preprocessing/trainTest", (req,res) => {
    try {
        let x = req.body;
        res.json( prp.trainTest.splitData(x['number'],x['timepoint'],x['data']));
        res.statusCode = 200;
    } catch (error) {
        console.log('error performing requested data splitting' + error);
        res.statusCode = 400;
    }
})

app.get("/preprocessing/tfprep", (req,res) => {
    try {
        res.json(prp.tfprep.convertToTensor(req.body['trainTest'],req.body['dataSpec']));
        res.statusCode = 200;
    } catch (error) {
        console.log('error converting to tensors' + error)
        res.statusCode = 400;
    }
})

app.get("/test",(req,res) => {
    try {
        let x = req.body;
        if(Math.random() < 0.7){
            res.json( {"result":req['subject']});
        } else {
            res.json( {"result":99999});
        }
    } catch (error) {
        console.log('Nope');
    }
})

app.listen(port, () => console.log('app is up'));