import { shallow } from 'enzyme';
import React from 'react';
import Content from './Content';

describe('Content component Unit Tests', () => {
    let componentContent;
    let content = '<div class="parser-output">Text</div>';

    beforeEach(() => {
        componentContent = shallow(<Content content={content} />);
    });

    it('should set inner html', () => {
        expect(componentContent.html()).toEqual(`<div><div class="parser-output">Text</div></div>`);
    });
});
