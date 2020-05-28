import 'bootstrap/dist/css/bootstrap.min.css';
import detectBrowserLanguage from 'detect-browser-language';
import React, { useState } from 'react';
import { useAsync } from 'react-async-hook';
import { Button } from 'react-bootstrap';
import './App.css';

const languages = ['de', 'en', 'es', 'fr', 'it', 'nl', 'pl', 'pt', 'sv', 'tr'];

function App() {
    // Feel free to replace the topic with "Albert Einstein"
    const topic = 'Sheryl Sandberg';
    const setInitialLanguage = () => {
        let language = detectBrowserLanguage().slice(0, 2);
        language = 'de';
        return languages.includes(language) ? language : 'en';
    };
    const [selectedLanguage, setselectedLanguage] = useState(setInitialLanguage());

    const baseUrl = `https://${selectedLanguage}.wikipedia.org`;
    const url =
        baseUrl +
        '/w/api.php?' +
        new URLSearchParams({
            origin: '*',
            action: 'parse',
            disableeditsection: true,
            page: topic,
            format: 'json',
        });

    const fetchSherylData = async () => {
        const data = await fetch(url);
        const jsonData = await data.json();
        // Hacky way to fix the external wikipedia links:
        const result = jsonData.parse.text['*'].replace(
            /href="\//g,
            `href="https://${selectedLanguage}.wikipedia.org/`
        );
        return result;
    };

    const data = useAsync(fetchSherylData, [selectedLanguage]);
    console.log(data);

    return (
        <div className="container">
            <div className="card my-2">
                <div className="card-body mx-auto">
                    <h2>
                        Wikipedia: <span>{topic}</span>
                    </h2>
                    <div className="buttonContainer">
                        {languages.map((language) => (
                            <Button
                                className={selectedLanguage === language ? 'active' : null}
                                key={language}
                                onClick={() => setselectedLanguage(language)}
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
