import App from './App';
import React from 'react';
import {mount} from 'enzyme';

describe("Trans Test!", function() {
    it("Trans Test 1", function() {
        const content = 'Welcome to IDB DUO!';
        const expected = "전자 칠판 DUO에 오신 것을 환영합니다!";
		const app = mount(
            <App locale={'ko-KR'} contents={content} />
		);
        const actual = app.text();

        expect(expected).toEqual(actual);
    });
});
