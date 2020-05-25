import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { useAsync } from 'react-async-hook';
import ReactHtmlParser from 'react-html-parser';
import './App.css';

// Alternative link, saved for later: // 'https://en.wikipedia.org/w/api.php?action=query&origin=*&prop=extracts&explaintext&pageids=1624080&format=json'

const baseUrl = 'https://en.wikipedia.org';
const url =
    baseUrl +
    '/w/api.php?' +
    new URLSearchParams({
        origin: '*',
        action: 'parse',
        disableeditsection: true,
        pageid: '1624080',
        format: 'json',
    });

const fetchSherylData = async () => {
    const data = await fetch(url);
    const jsonData = await data.json();
    return jsonData.parse.text['*'];
};

function App() {
    const data = useAsync(fetchSherylData, []);

    return (
        <div className="App">
            {data.loading && 'Loading...'}
            {data.result && ReactHtmlParser(data.result)}
        </div>
    );
}

export default App;
