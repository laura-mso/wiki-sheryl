import React from 'react';
import './Content.css';

export default function Content({ content }) {
    return <div dangerouslySetInnerHTML={{ __html: content }}></div>;
}
