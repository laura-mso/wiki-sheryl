[![Netlify Status](https://api.netlify.com/api/v1/badges/73fe9a55-137b-4d5b-bbf2-3dd298c3966f/deploy-status)](https://app.netlify.com/sites/wiki-sheryl/deploys)

## Features

-   Shows content and pictures of Wikipedia page about one person
    -   currently "Sheryl Sandberg", can be changed to "Albert Einstein" in src/App.js
-   User can switch between 10 languages
-   First loaded language is based on user's location/language settings

## Restrictions:

### High dependency on output of [Wikipedia Parse API](https://www.mediawiki.org/wiki/API:Parsing_wikitext)

-   Images are automatically inserted
-   If css class names in html change layout might be broken
    -   Css fixes could not take effect anymore
    -   Current css stylesheet (general and german) are copied: if classnames change in html, css will not be updated automatically. Alternatively I could have linked to their stylesheets, creating a dependency on wikipedia stylesheet's url
-   A different approach would have been to use the Revisions API, and get the text and pictures individually. This would have caused more initial effort but might have made it possible to create a self-made styling of the page without relying on the classes of Wikipedia. On the other hand, the texts of the different language Wikipeda pages are all different in length and structure and a one-fits-all styling might not have been ideal.

### Security

-   The usage of "dangerouslySetInnerHtml" is clearly not recommended, because script tags could be inserted through it

### Testing

-   Tests for the asynchronous data retrieval with useAsync are still missing, in order to ensure that loading, error and result state are correctly handled.

### Structure

-   Currently a lot of code is in the App.js file, which would not happen in a real project where router and components would be handled in there. But due to this projects' limited scope I kept it there. Also the button section, the loader and error message would be (reusable) react components in a real project and not just direct html in one file.

## How to run the app

Clone the repo and open terminal in the newly created folder, then:

`npm start` Runs the app in the development mode.

`npm test` Launches the test runner in the interactive watch mode.

`npm run build` Builds the app for production to the `build` folder.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
