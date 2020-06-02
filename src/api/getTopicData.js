export const replaceHref = (text, languageCode) => {
    return text.replace(/href="\//g, `href="https://${languageCode}.wikipedia.org/`);
};

export const fetchTopicData = async (url, languageCode) => {
    const data = await fetch(url);
    const jsonData = await data.json();
    const result = replaceHref(jsonData.parse.text['*'], languageCode);
    return result;
};
