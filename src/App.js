import 'bootstrap/dist/css/bootstrap.min.css';
import detectBrowserLanguage from 'detect-browser-language';
import React, { useState } from 'react';
import { useAsync } from 'react-async-hook';
import { Button } from 'react-bootstrap';
import './App.css';

const languages = ['de', 'en', 'es', 'fr', 'it', 'nl', 'pl', 'pt', 'sv', 'tr'];

function App() {
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
            page: 'Sheryl Sandberg',
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

    return (
        <div className="container">
            <div className="buttonContainer">
                {languages.map((language) => (
                    <Button
                        style={{ margin: '5px 5px 5px 0', padding: '0 5px', width: '40px' }}
                        className={selectedLanguage === language ? 'active' : null}
                        key={language}
                        onClick={() => setselectedLanguage(language)}
                    >
                        {language}
                    </Button>
                ))}
            </div>
            <div class="card my-2">
                <div class="card-body mx-auto">
                    <h2 className="mx-auto">
                        Wikipedia: <span>Sheryl Sandberg</span>
                    </h2>
                </div>
            </div>
            {data.loading && <div>Please wait, the page is loading...</div>}
            {data.result && <div id="content" dangerouslySetInnerHTML={{ __html: data.result }} />}
        </div>
    );
}

export default App;
