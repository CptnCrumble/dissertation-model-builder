var dataSpec = {};
var validData = [];
var modelData = {};
var modelSpecList = [];

function getValidData() {
    var url = "/preprocessing/validData"
    var xhttp = new XMLHttpRequest();    
    xhttp.open("GET",url,true);
    xhttp.onload = function() {
        validData = JSON.parse(xhttp.response);
    }    
    xhttp.send(null);
}

function getDataSpec() {
    var url  = "/preprocessing/dataSpec";
    var xhr  = new XMLHttpRequest();    
    xhr.open('GET', url, true);
    xhr.onload = function () {
        dataSpec = JSON.parse(xhr.response);               
    }
    xhr.send(null);    
}

function splitTrainTest(dataObject) {
    var url = "/preprocessing/trainTest";
    var xhr = new XMLHttpRequest();
    xhr.open('GET',url,true);
    xhr.onload = function() {
        modelData = JSON.parse(xhr.response);
    }
    xhr.send(JSON.stringify(dataObject));
}

function createModelList() {
    let n = validData.length;
    console.log(n);
    document.getElementById("valid-data-count").innerHTML = n;

    for (let i = 0; i < n; i++) {
        let testData = validData[i];
        let tmp = JSON.parse(JSON.stringify(validData));
        let trainData = tmp.splice(i,1);
        modelSpecList.push(
            {
                'testData':testData,
                'trainingData': trainData
            }
        );
    }   
}

function convertToTensorFlow(dataObject) {
    var url = "/preprocessing/tfprep";
    var xhr = new XMLHttpRequest();
    xhr.open('GET',url,true);
    xhr.onload = function() {
        modelData = JSON.parse(xhr.response);
    }
    xhr.send(JSON.stringify(dataObject));
}