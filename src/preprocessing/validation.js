const fs = require('fs');

// ---- Data ---------------------------------------------------------------------
var validData = [];
// Base questions and allowed values
const baseKeys = {
    'HADS-TENSE':[0,1,2,3],
    'HADS-ENJOY':[0,1,2,3],
    'HADS-FRIGHT':[0,1,2,3],
    'HADS-LAUGH':[0,1,2,3],
    'HADS-WORRY':[0,1,2,3],
    'HADS-CHEER':[0,1,2,3],
    'HADS-EASE':[0,1,2,3],
    'HADS-SLOW':[0,1,2,3],
    'HADS-BUTTERFLY':[0,1,2,3],
    'HADS-INTEREST':[0,1,2,3],
    'HADS-RESTLESS':[0,1,2,3],
    'HADS-FORWARD':[0,1,2,3],
    'HADS-PANIC':[0,1,2,3],
    'HADS-BOOK':[0,1,2,3],
    'NMS-1':[0,1],
    'NMS-2':[0,1],
    'NMS-3':[0,1],
    'NMS-4':[0,1],
    'NMS-5':[0,1],
    'NMS-6':[0,1],
    'NMS-7':[0,1],
    'NMS-8':[0,1],
    'NMS-9':[0,1],
    'NMS-10':[0,1],
    'NMS-11':[0,1],
    'NMS-12':[0,1],
    'NMS-13':[0,1],
    'NMS-14':[0,1],
    'NMS-15':[0,1],
    'NMS-16':[0,1],
    'NMS-17':[0,1],
    'NMS-18':[0,1],
    'NMS-19':[0,1],
    'NMS-20':[0,1],
    'NMS-21':[0,1],
    'NMS-22':[0,1],
    'NMS-23':[0,1],
    'NMS-24':[0,1],
    'NMS-25':[0,1],
    'NMS-26':[0,1],
    'NMS-27':[0,1],
    'NMS-28':[0,1],
    'NMS-29':[0,1],
    'NMS-30':[0,1],
    'NMS-31':[0,1],
    'UPDRS-2.1':[0,1,2,3,4],
    'UPDRS-2.2':[0,1,2,3,4],
    'UPDRS-2.3':[0,1,2,3,4],
    'UPDRS-2.4':[0,1,2,3,4],
    'UPDRS-2.5':[0,1,2,3,4],
    'UPDRS-2.6':[0,1,2,3,4],
    'UPDRS-2.7':[0,1,2,3,4],
    'UPDRS-2.8':[0,1,2,3,4],
    'UPDRS-2.9':[0,1,2,3,4],
    'UPDRS-2.10':[0,1,2,3,4],
    'UPDRS-2.11':[0,1,2,3,4],
    'UPDRS-2.12':[0,1,2,3,4],
    'UPDRS-2.13':[0,1,2,3,4],
    'PDSS-1':[0,1,2,3,4],
    'PDSS-2':[0,1,2,3,4],
    'PDSS-3':[0,1,2,3,4],
    'PDSS-4':[0,1,2,3,4],
    'PDSS-5':[0,1,2,3,4],
    'PDSS-6':[0,1,2,3,4],
    'PDSS-7':[0,1,2,3,4],
    'PDSS-8':[0,1,2,3,4],
    'PDSS-9':[0,1,2,3,4],
    'PDSS-10':[0,1,2,3,4],
    'PDSS-11':[0,1,2,3,4],
    'PDSS-12':[0,1,2,3,4],
    'PDSS-13':[0,1,2,3,4],
    'PDSS-14':[0,1,2,3,4],
    'PDSS-15':[0,1,2,3,4],
    'PDQ8-1':[0,1,2,3,4],
    'PDQ8-2':[0,1,2,3,4],
    'PDQ8-3':[0,1,2,3,4],
    'PDQ8-4':[0,1,2,3,4],
    'PDQ8-5':[0,1,2,3,4],
    'PDQ8-6':[0,1,2,3,4],
    'PDQ8-7':[0,1,2,3,4],
    'PDQ8-8':[0,1,2,3,4],
    'PDQ39-1':[0,1,2,3,4],
    'PDQ39-2':[0,1,2,3,4],
    'PDQ39-3':[0,1,2,3,4],
    'PDQ39-4':[0,1,2,3,4],
    'PDQ39-5':[0,1,2,3,4],
    'PDQ39-6':[0,1,2,3,4],
    'PDQ39-7':[0,1,2,3,4],
    'PDQ39-8':[0,1,2,3,4],
    'PDQ39-9':[0,1,2,3,4],
    'PDQ39-10':[0,1,2,3,4],
    'PDQ39-11':[0,1,2,3,4],
    'PDQ39-12':[0,1,2,3,4],
    'PDQ39-13':[0,1,2,3,4],
    'PDQ39-14':[0,1,2,3,4],
    'PDQ39-15':[0,1,2,3,4],
    'PDQ39-16':[0,1,2,3,4],
    'PDQ39-17':[0,1,2,3,4],
    'PDQ39-18':[0,1,2,3,4],
    'PDQ39-19':[0,1,2,3,4],
    'PDQ39-20':[0,1,2,3,4],
    'PDQ39-21':[0,1,2,3,4],
    'PDQ39-22':[0,1,2,3,4],
    'PDQ39-23':[0,1,2,3,4],
    'PDQ39-24':[0,1,2,3,4],
    'PDQ39-25':[0,1,2,3,4],
    'PDQ39-26':[0,1,2,3,4],
    'PDQ39-27':[0,1,2,3,4],
    'PDQ39-28':[0,1,2,3,4],
    'PDQ39-29':[0,1,2,3,4],
    'PDQ39-30':[0,1,2,3,4],
    'PDQ39-31':[0,1,2,3,4],
    'PDQ39-32':[0,1,2,3,4],
    'PDQ39-33':[0,1,2,3,4],
    'PDQ39-34':[0,1,2,3,4],
    'PDQ39-35':[0,1,2,3,4],
    'PDQ39-36':[0,1,2,3,4],
    'PDQ39-37':[0,1,2,3,4],
    'PDQ39-38':[0,1,2,3,4],
    'PDQ39-39':[0,1,2,3,4],
    'PDQC-1':[0,1,2,3,4],
    'PDQC-2':[0,1,2,3,4],
    'PDQC-3':[0,1,2,3,4],
    'PDQC-4':[0,1,2,3,4],
    'PDQC-5':[0,1,2,3,4],
    'PDQC-6':[0,1,2,3,4],
    'PDQC-7':[0,1,2,3,4],
    'PDQC-8':[0,1,2,3,4],
    'PDQC-9':[0,1,2,3,4],
    'PDQC-10':[0,1,2,3,4],
    'PDQC-11':[0,1,2,3,4],
    'PDQC-12':[0,1,2,3,4],
    'PDQC-13':[0,1,2,3,4],
    'PDQC-14':[0,1,2,3,4],
    'PDQC-15':[0,1,2,3,4],
    'PDQC-16':[0,1,2,3,4],
    'PDQC-17':[0,1,2,3,4],
    'PDQC-18':[0,1,2,3,4],
    'PDQC-19':[0,1,2,3,4],
    'PDQC-20':[0,1,2,3,4],
    'PDQC-21':[0,1,2,3,4],
    'PDQC-22':[0,1,2,3,4],
    'PDQC-23':[0,1,2,3,4],
    'PDQC-24':[0,1,2,3,4],
    'PDQC-25':[0,1,2,3,4],
    'PDQC-26':[0,1,2,3,4],
    'PDQC-27':[0,1,2,3,4],
    'PDQC-28':[0,1,2,3,4],
    'PDQC-29':[0,1,2,3,4]
}

// Array of summary stats eg; continuous data
const summaryKeys = [
    'NMS-TOTAL',
    'PDSS-TOTAL',
    'PDQ8-TOTAL',
    'PDQ8-PDQSI',
    'Anxiety',
    'Depression',
    'BKS',
    'DKS',
    'FDS',
    'PTI',
    'PTT',
    'PDQ39-PDQSI',
    'PDQ39-Mob',
    'PDQ39-ADL',
    'PDQ39-Emot',
    'PDQ39-Stigma',
    'PDQ39-Soc-Sup',
    'PDQ39-Cog',
    'PDQ39-Comm',
    'PDQ39-Discom',
    'UPDRS-TOTAL',
    'PDQC-PDQSI',
    'PDQC-social/personal-activities',
    'PDQC-anx/dep',
    'PDQC-Self-care',
    'PDQC-Stress'
];

// ---- support functions ----------------------------------------------------------------

function summaryValidate(dataObject,key) {
    let value = dataObject[key];
    return value !== undefined && 
        value !== "N/A" &&
        typeof value === 'number';
}

function baseValidate(dataObject,parameter){
    return baseKeys[parameter].includes(dataObject[parameter]);
}

// Validate that a data object has valid values for ALL requested parameters
function validate(parameterList,dataObject) {    
    let output = [];
    parameterList.forEach( function(p) {
            if(summaryKeys.includes(p)){
                output.push(summaryValidate(dataObject,p));
            } else {
                output.push(baseValidate(dataObject,p));
            }
        }
    )
    return output.reduce((a,b) => {return a && b});
}

// Trim away unwanted parameters & ALWAYS keep Number & Timepoint as they are the Primary keys
function trimData (parameterList, filteredDataObjects) {   
    return filteredDataObjects.map( x => {
        let valid = {}
        valid['Number'] = x['Number'];
        valid['Timepoint'] = x['Timepoint'];

        parameterList.forEach( function(p) {
            valid[p] = x[p];
        })

        return valid;
    });
}

// ---- API endpoint functions -----------------------------------------------------------

function getValidData() {
    return validData;
}

function putValidData(dataSpecObject) {
    let parameterList = JSON.parse(JSON.stringify(dataSpecObject['source']));
    parameterList.push(dataSpecObject['subject']);

    try {
        let rawData = fs.readFileSync('data/common-data.json');
        let commonData = JSON.parse(rawData);
        let filtered = commonData.filter( x => validate(parameterList,x));
        validData = trimData(parameterList,filtered);
        return validData;    
    } catch (error) {
        throw 'Failed to validate against dataSpec object'
    }    
}

module.exports = {
    getValidData,
    putValidData
}
