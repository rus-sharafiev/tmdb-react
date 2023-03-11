import React from 'react'
import { hydrateRoot, createRoot } from 'react-dom/client'

import { store } from './store'
import { Provider } from 'react-redux'
import { BrowserRouter, RouterProvider } from 'react-router-dom'
import router from './router'

document.querySelector('body')?.classList.add('icons-hidden')
document.fonts.load("24px Material Symbols Rounded")
    .then(() => { document.querySelector('body')?.classList.remove('icons-hidden') });

// const Root: React.FC = () => {
//     return (
//         <html lang="ru">
//             <head>
//                 <meta charSet="utf-8" />
//                 <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no" />
//                 <link rel="icon" href="/favicon-32.png" type="image/png" />
//                 <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
//                 <link href="/index.css" rel="stylesheet" />
//                 <title>RU TMDB</title>
//             </head>
//             <body>
//                  <Provider store={store}>
//                      <RouterProvider router={router} />
//                  </Provider> */}
//             </body>
//         </html>
//     )
// }
// hydrateRoot(document, <Root />);

createRoot(document.getElementById('root') as HTMLElement)
    .render(
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    )