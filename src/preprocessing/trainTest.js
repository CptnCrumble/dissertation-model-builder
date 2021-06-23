function findIndex(number,timepoint,array) {
    for (let index = 0; index < array.length; index++) {
        if(
            array[index]['Number'] === number &&
            array[index]['Timepoint'] === timepoint
        ) {
            return index;
        }
    }
}

function createTestData(number,timepoint,array) {
    let i = findIndex(number,timepoint,array);
    return array[i];
}

function createTrainData(number,timepoint,array) {
    let output = JSON.parse(JSON.stringify(array));
    let i = findIndex(number,timepoint,array);
    output.splice(i,1);
    return output;
}

function splitData(number,timepoint,array){
    let testData = createTestData(number,timepoint,array);
    let trainData = createTrainData(number,timepoint,array);
    return {
        'testData':testData,
        'trainingData': trainData
    };
}

module.exports = {splitData}