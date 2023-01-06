import React from 'react';
import { hydrateRoot, createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './app';

if (document.fonts.status !== 'loaded') document.querySelector('body')?.classList.add('icons-hidden');
const iconsLoaded = (event: any) => {
    event.fontfaces.map( (font: any) => {
        if (font.family == 'Material Symbols Rounded') {
            document.querySelector('body')?.classList.remove('icons-hidden');
            document.fonts.removeEventListener("loadingdone", iconsLoaded);
        }
    })
}
document.fonts.addEventListener("loadingdone", iconsLoaded);

// const Root: React.FC = () => {
//     return (
//         <html lang="ru">
//             <head>
//                 <meta charSet="utf-8" />
//                 <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no" />
//                 <link rel="icon" href="/favicon-32x32.png" type="image/png" />
//                 <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
//                 <link href="/index.css" rel="stylesheet" />
//                 <title>RU TMDB</title>
//             </head>

//             <body>
//                 <BrowserRouter>
//                     <App />
//                 </BrowserRouter>
//             </body>
//         </html>
//     )
// }
// hydrateRoot(document, <Root />);

createRoot(document.querySelector('body') as HTMLElement).render(<BrowserRouter><App /></BrowserRouter>);