import App from '../App/App';
import React from 'react';
import {mount} from 'enzyme';
import xlsx from 'node-xlsx';

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

describe.each(titleRow)('%s', (title)  =>{
    let basicString = '';
    let expected = '';
    let received = ''
    let app = null;

    // 'Basic String' col index is 0
    for (let i=1; i<totalData.data.length; i++) {
        test(expected, () => {
            basicString = totalData.data[i][titleIndex['Basic String']];
            expected = totalData.data[i][titleIndex[title]];

            app = mount(
                <App locale={langCodes[title]} contents={basicString} />
            );
            received = app.text();

            expect(received).toEqual(expected);
        });
    }
});