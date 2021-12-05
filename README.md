# dissertation-model-builder
Simple web app that allows the subsetting of common JSON created by https://github.com/CptnCrumble/dissertation-adapter. 

Allows user to determine the Subject & Source values and create a specfically formatted JSON file that can be used by the ML models stored in https://github.com/CptnCrumble/dissertation-jupyter-notebooks

## Running the app
Built using node version 14.2.0 or higher.  
Simply run ```node app.js``` application then runs on http://localhost:3000/

## Example resulting data structure
{
    "model_id": "RANDOM-ID",
    "data_spec": {
        "subject": "PDQC-PDQSI",
        "source": [
            "Anxiety",
            "Depression",
            "PDSS-TOTAL",
            "NMS-TOTAL",
            "UPDRS-TOTAL",
            "PDQ8-TOTAL",
            "PDQ8-PDQSI",
            "PDQ39-PDQSI",
            "PDQ39-Mob",
            "PDQ39-ADL",
            "PDQ39-Emot",
            "PDQ39-Stigma",
            "PDQ39-Soc-Sup",
            "PDQ39-Cog",
            "PDQ39-Comm",
            "PDQ39-Discom",
            "BKS",
            "DKS",
            "FDS",
            "PTI",
            "PTT"
        ]
    },
    "data": [ EXAMPLE DATA ]
}

