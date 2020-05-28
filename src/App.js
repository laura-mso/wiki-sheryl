import 'bootstrap/dist/css/bootstrap.min.css';
import i18next from 'i18next';
import React from 'react';
import { useAsync } from 'react-async-hook';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import './App.css';

const languageCodes = ['de', 'en', 'es', 'fr', 'it', 'nl', 'pl', 'pt', 'sv', 'tr'];

function App() {
    const { t, i18n } = useTranslation();
    // Feel free to replace the topic with "Albert Einstein"
    const topic = 'Sheryl Sandberg';

    let languageCode = i18next.language;

    const baseUrl = `https://${languageCode}.wikipedia.org`;
    const url =
        baseUrl +
        '/w/api.php?' +
        new URLSearchParams({
            origin: '*',
            action: 'parse',
            disableeditsection: 'true',
            page: topic,
            format: 'json',
        });

    const fetchSherylData = async () => {
        const data = await fetch(url);
        const jsonData = await data.json();
        // Hacky way to fix the external wikipedia links:
        const result = jsonData.parse.text['*'].replace(/href="\//g, `href="https://${languageCode}.wikipedia.org/`);
        return result;
    };

    const data = useAsync(fetchSherylData, [languageCode]);

    return (
        <div className="container">
            <div className="card my-2">
                <div className="card-body mx-auto">
                    <p>Translation test: {t('title')}</p>
                    <h2>
                        Wikipedia: <span>{topic}</span>
                    </h2>
                    <div className="buttonContainer">
                        {languageCodes.map((language) => (
                            <Button
                                className={language === languageCode ? 'active' : undefined}
                                key={language}
                                onClick={() => i18n.changeLanguage(language)}
                            >
                                {language}
                            </Button>
                        ))}
                    </div>
                </div>
            </div>
            {data.loading && <div className="loader mx-auto mt-5"></div>}
            {data.result && <div id="content" dangerouslySetInnerHTML={{ __html: data.result }} />}
            {data.error && <div className="mt-5">Sorry we were not able to find "{topic}" on Wikipedia.</div>}
        </div>
    );
}

export default App;
