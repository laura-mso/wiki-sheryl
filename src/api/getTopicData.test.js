import { replaceHref } from './getTopicData';

describe('replacement', () => {
    let initialText = `<a href="/wiki/picture.jpg"></a><a href="/wiki/link">link</a>`;
    let expectedText = `<a href="https://de.wikipedia.org/wiki/picture.jpg"></a><a href="https://de.wikipedia.org/wiki/link">link</a>`;

    it('should replace links with external links', () => {
        expect(replaceHref(initialText, 'de')).toEqual(expectedText);
    });
});
