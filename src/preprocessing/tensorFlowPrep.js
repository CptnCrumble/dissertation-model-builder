const tf = require('@tensorflow/tfjs');
//require('@tensorflow/tfjs-node');

function testPrep(testData,dataSpec) {    
    return {
        'result': 'PENDING',
        'source': tf.tensor(
            dataSpec['source'].map( x => testData[x])
        )
    }
}

function trainPrep(trainingData,dataSpec) {
    let subjectValues = [];
    let sourceValues = [];
    trainingData.forEach(dataObject => {
        subjectValues.push(dataObject[dataSpec['subject']]);
        let sv = dataSpec['source'].map( x => dataObject[x]);
        sourceValues.push(sv);
    });

    return {
        'subjectValues': tf.tensor(subjectValues),
        'sourceData': tf.tensor(sourceValues)
    }
}

function convertToTensor(trainTest, dataSpec) {
    return {
        'test': testPrep(trainTest['testData'],dataSpec),
        'train': trainPrep(trainTest['trainingData'],dataSpec)
    }
}

module.exports = {    
    convertToTensor
}