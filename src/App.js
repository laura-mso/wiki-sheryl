import 'bootstrap/dist/css/bootstrap.min.css';
import detectBrowserLanguage from 'detect-browser-language';
import React, { useState } from 'react';
import { useAsync } from 'react-async-hook';
import { Button } from 'react-bootstrap';
import './App.css';

// Alternative link, saved for later: // 'https://en.wikipedia.org/w/api.php?action=query&origin=*&prop=extracts&explaintext&pageids=1624080&format=json'

const languages = ['de', 'en', 'es', 'fr', 'it', 'nl', 'pl', 'pt', 'sv', 'tr'];

function App() {
    const setInitialLanguage = () => {
        let language = detectBrowserLanguage().slice(0, 2);
        language = 'de';
        return languages.includes(language) ? language : 'en';
    };
    const [selectedLanguage, setselectedLanguage] = useState(setInitialLanguage());
    // setselectedLanguage('de');

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
                        style={{ marginRight: '5px', padding: '0 5px', width: '40px' }}
                        className={selectedLanguage === language ? 'active' : null}
                        key={language}
                        onClick={() => setselectedLanguage(language)}
                    >
                        {language}
                    </Button>
                ))}
            </div>
            {data.loading && <div>Please wait, the page is loading...</div>}
            {data.result && <div dangerouslySetInnerHTML={{ __html: data.result }} />}
        </div>
    );
}

export default App;
