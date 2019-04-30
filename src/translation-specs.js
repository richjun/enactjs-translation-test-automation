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
    let ret = text;
    if (env.IGNORE_PERIOD && text.lastIndexOf('.') > 0 && text.lastIndexOf('.') === text.length-1) {
        ret =  text.substr(0, text.lastIndexOf('.'));
    }

    if (env.IGNORE_PERIOD && text.lastIndexOf('。') > 0 && text.lastIndexOf('。') === text.length-1) {
        ret =  text.substr(0, text.lastIndexOf('。'));
    }

    if (env.TRIM_ON) {
        ret = ret.trim();
    }

    return ret;
}

describe.each(titleRow)('%s', (title)  =>{
    let originBasicString = '';
    let ignoredBasicString = '';
    let received = '';
    let expected = '';

    // 'Basic String' col index is 0
    for (let i=1; i<totalData.data.length; i++) {
        test(totalData.data[i][titleIndex['Basic String']], () => {
            originBasicString = totalData.data[i][titleIndex['Basic String']];
            received = mount(
                    <App locale={langCodes[title]} contents={originBasicString} />
                ).text();

            // if originBasicString is not translated, try to translate after applying ignore pattern.
            if (originBasicString === received) {
                ignoredBasicString = applyIgnorePattern(originBasicString);
                received =  mount(
                        <App locale={langCodes[title]} contents={ignoredBasicString} />
                    ).text();
            }

            received = applyIgnorePattern(received);
            expected = applyIgnorePattern(totalData.data[i][titleIndex[title]]);

            expect(received).toEqual(expected);
        });
    }
});