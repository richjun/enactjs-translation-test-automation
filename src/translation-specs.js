import App from './App';
import React from 'react';
import {mount} from 'enzyme';
import xlsx from 'node-xlsx';

const env = require('dotenv').config().parsed;
const path = require('path');
const loadJsonFile = require('load-json-file');
const langCodes = loadJsonFile.sync(path.resolve('src', 'languageCode.json'));
const excelPath = path.resolve('excel', 'mms.xlsx');
const totalData = xlsx.parse(excelPath)[0];

let titleIndex = {};
const titleRow = totalData.data[0].filter((title, index) => {
    if (langCodes[title]) {
        titleIndex[title] = index;
        return true;
    } else if (title  === 'Basic String'){
        titleIndex[title] = index;
        return false;
    } else {
        return false;
    }
});

const applyIgnorePattern = (text) => {
    if (env.IGNORE_PERIOD && text.lastIndexOf('.') > 0 && text.lastIndexOf('.') === text.length-1) {
        return text.substr(0, text.lastIndexOf('.'));
    } else {
        return text;
    }
}

describe.each(titleRow)('%s', (title)  =>{
    let basicString = '';
    let expected = '';
    let received = ''
    let app = null;

    // 'Basic String' col index is 0
    for (let i=1; i<totalData.data.length; i++) {
        test(totalData.data[i][titleIndex['Basic String']], () => {
            basicString = applyIgnorePattern(totalData.data[i][titleIndex['Basic String']]);
            expected = applyIgnorePattern(totalData.data[i][titleIndex[title]]);

            app = mount(
                <App locale={langCodes[title]} contents={basicString} />
            );
            received = applyIgnorePattern(app.text());

            expect(received).toEqual(expected);
        });
    }
});