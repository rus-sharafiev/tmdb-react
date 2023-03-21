
// Web server
const fastify = require('fastify')({ logger: true })

// -------------- Main Route SSR ----------------------------------------------------------------------------------------------------------

// fastify.get('/*', (request, reply) => {
//     const { pipe } = renderToPipeableStream(
//         <StaticRouter location={request.url} >
//             <html lang="ru">
//                 <head>
//                     <meta charSet="utf-8" />
//                     <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no" />
//                     <link rel="icon" href="/favicon-32.png" type="image/png" />
//                     <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
//                     <link href="/index.css" rel="stylesheet" />
//                     <title>RU TMDB </title>
//                 </head>
//                 <body>
//                     <Routes>
//                          AppRoutes
//                     </Routes>
//                 </body>
//             </html>
//         </StaticRouter>,
//         {
//             bootstrapScripts: ['/index.js'],
//             onShellReady() {
//                 reply.raw.setHeader('content-type', 'text/html')
//                 pipe(reply.raw);
//             }
//         })
// })

// -------------- Main Route Dynamic ------------------------------------------------------------------------------------------------------

fastify.get('/*', async (request, reply) => {
  reply.type('text/html')

  return `
        <html lang="ru">
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no" />
                <link rel="icon" href="/favicon-32.png" type="image/png" />
                <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
                <link href="/index.css" rel="stylesheet" />
                <script src="/index.js" defer></script>
                <title>RU TMDB</title>
            </head>
            <body>
                <div id='root'></div>
            </body>
        </html>
        `
})

const start = async () => {
  try {
    await fastify.listen({ port: 5000 })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()