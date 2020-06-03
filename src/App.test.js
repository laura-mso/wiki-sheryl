import { mount } from 'enzyme';
import React from 'react';
import App from './App';

jest.mock('react-i18next', () => ({
    useTranslation: (selectedLanguage = 'en') => ({
        t: (k) => k,
        i18n: { language: selectedLanguage, changeLanguage: (language) => (selectedLanguage = language) },
    }),
}));

describe('App component Unit Tests', () => {
    let componentApp;
    beforeEach(() => {
        componentApp = mount(<App />);
    });
    it('should have 10 buttons', () => {
        expect(componentApp.find('button')).toHaveLength(10);
    });
    it('should switch to another language on button click', () => {
        const button = componentApp.find('button').first();
        button.simulate('click');
        expect(button.hasClass('active'));
    });
    it('should contain loader', () => {
        expect(componentApp.find('.loader')).toHaveLength(1);
    });
    it('should contain content', () => {
        expect(componentApp.find('Content')).toBeTruthy();
    });
});
