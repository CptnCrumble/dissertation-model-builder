const express = require('express');
const prp = require('./src/preprocessing')

const app = express();
const port = 3000;
app.use(express.json());

app.get("/",(req,res) => {
    console.log('home page');
})

app.get("/preprocessing/dataSpec", (req,res) => {
    res.json(prp.dataSpec.getDataSpec());
})

app.put("/preprocessing/dataSpec", (req,res) => {
    try {
        prp.dataSpec.putDataSpec(req.body);
        res.statusCode = 200;
    } catch (error) {
        console.log('error updating data spec');
        res.statusCode = 400;
    }
})

app.listen(port, () => console.log('app is up'));