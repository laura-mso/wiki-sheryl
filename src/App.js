import 'bootstrap/dist/css/bootstrap.min.css';
import i18next from 'i18next';
import React from 'react';
import { useAsync } from 'react-async-hook';
import { useTranslation } from 'react-i18next';
import './App.css';
import Content from './components/Content';

const languageCodes = ['de', 'en', 'es', 'fr', 'it', 'nl', 'pl', 'pt', 'sv', 'tr'];
// Feel free to replace the topic with "Albert Einstein"
const topic = 'Sheryl Sandberg';

function App() {
    const { t, i18n } = useTranslation();

    let languageCode = i18next.language.slice(0, 2);

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
                    <h2>
                        Wikipedia: <span>{topic}</span>
                    </h2>
                    <div className="buttonContainer">
                        {languageCodes.map((language) => (
                            <button
                                type="button"
                                className={language === languageCode ? 'active btn btn-primary' : 'btn btn-primary'}
                                key={language}
                                onClick={() => i18n.changeLanguage(language)}
                            >
                                {language}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
            {data.loading && <div className="loader mx-auto mt-5"></div>}
            {data.result && (
                <div id="content">
                    <Content content={data.result} />
                </div>
            )}
            {data.error && <div className="mt-5">{t('errors.notFound')}</div>}
        </div>
    );
}

export default App;
