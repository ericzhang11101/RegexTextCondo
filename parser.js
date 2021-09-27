
// launch with node parser.js PATH_TO_FILE
const path = process.argv[2]

function getFileAndLog(filePath){
    const fs = require('fs')
    let fileInfo
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err){
            console.error(err)
        }
        else{
            matchRegexAndLog(data)
        }
    })
}

// Customer Number and Account Number
let customerAndAccountRegex = /(?<=Utility Bill[\r\n] \W*)\d*\W-\W\d*/g

// Bill Period
let billPeriodRegex = /\w+\s\d+,\s\d+\sto\s\w+\s\d+,\s\d+(?=[\r\n]+Activity since last bill)/g

// Bill Number
let billNumberRegex = /(?<=Bill\snumber:\s)\d*/g

// Bill Date
let billDateRegex = /(?<=Bill\sdate:\s)\w+\s\d+,\s\d+/g

// Total New Charges (include $ in match)
let totalNewChargesRegex = /(?<=Total\snew\scharges\s+)\$[\d\,\.]+/g
// Total New Chargex (no $ in match)
// let totalNewChargesRegex = /(?<=Total\snew\scharges\s+\$)[\d\,\.]+/g


function matchRegexAndLog(data){
    console.log('Customer and account number: '  + data.match(customerAndAccountRegex))
    console.log('Bill period: ' + data.match(billPeriodRegex))
    console.log('Bill number: ' + data.match(billNumberRegex))
    console.log('Bill date: ' + data.match(billDateRegex))
    console.log('Total new charges: ' + data.match(totalNewChargesRegex))
}

getFileAndLog(path)