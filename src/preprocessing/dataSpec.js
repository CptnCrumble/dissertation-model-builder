var dataSpec = {'init':'default'}

function putDataSpec(newSpec) {
    if(
        typeof newSpec['subject'] === "string" && Array.isArray(newSpec['source'])
    ) {
        dataSpec = newSpec;
        return true
    } else {
        throw 'new data spec not in valid format';
    }
}

function getDataSpec() {
    return dataSpec;
}

module.exports = {
    putDataSpec,
    getDataSpec
}