/* eslint-disable @typescript-eslint/naming-convention */
import type { Handler } from 'aws-lambda';
import { open_api_doc } from '../../nest/main';

const themes = [
  (open_api_doc: string) => `
  <!DOCTYPE html>
<html>
  <head>
    <title>Redoc</title>
    <!-- needed for adaptive design -->
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link
      href="https://fonts.googleapis.com/css?family=Montserrat:300,400,700|Roboto:300,400,700"
      rel="stylesheet"
    />

    <!--
    Redoc doesn't change outer page styles
    -->
    <style>
      body {
        margin: 0;
        padding: 0;
      }
    </style>
  </head>
  <body>
    <div id="redoc-container"></div>
    <!--
    Redoc element with link to your OpenAPI definition
    -->
    <script id="swagger" type="application/json">${open_api_doc}</script>
    <!--
    Link to Redoc JavaScript on CDN for rendering standalone element
    -->
    <script src="https://cdn.redoc.ly/redoc/latest/bundles/redoc.standalone.js"></script>
    <script>
      document.addEventListener('DOMContentLoaded', (event) => {
        let docEl = document.getElementById("thedoc");
        let objSpec = JSON.parse(document.getElementById('swagger').text)

        Redoc.init(objSpec, {
          scrollYOffset: 50
        }, document.getElementById('redoc-container'))
      })
    </script>
  </body>
</html>`,
  (open_api_doc: string) => `
<!doctype html>
<html>
  <head>
    <!-- Global site tag (gtag.js) - Google Analytics -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, minimum-scale=1, initial-scale=1, user-scalable=yes">
    <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;600&family=Roboto+Mono&display=swap" rel="stylesheet">
    <script type="module" src="https://unpkg.com/rapidoc/dist/rapidoc-min.js"></script>
    <style>
      rapi-doc{
        width:100%;
      }
    </style>
  </head>
  <body>
    <rapi-doc
      allow-authentication="true"
      allow-spec-file-load="false"
      allow-spec-url-load="false"
      allow-try="true"
      id="thedoc"
      layout="column"
      mono-font="Roboto Mono"
      persist-auth="true"
      regular-font="Open Sans"
      render-style="focused"
      render-style="read"
      show-components="true"
      show-method-in-nav-bar="as-colored-block"
      theme="light"
    >
    </rapi-doc>
    <script id="swagger" type="application/json">${open_api_doc}</script>
    <script>
      document.addEventListener('DOMContentLoaded', (event) => {
        let docEl = document.getElementById("thedoc");
        let objSpec = JSON.parse(document.getElementById('swagger').text)
        docEl.loadSpec(objSpec);
      })
    </script>
  </body>
</html>`,
  (open_api_doc: string) => `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta
      name="description"
      content="SwaggerUI"
    />
    <title>SwaggerUI</title>
    <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist@4.5.0/swagger-ui.css" />
  </head>
  <body>
  <div id="swagger-ui"></div>
  <script src="https://unpkg.com/swagger-ui-dist@4.5.0/swagger-ui-bundle.js" crossorigin></script>
  <script src="https://unpkg.com/swagger-ui-dist@4.5.0/swagger-ui-standalone-preset.js" crossorigin></script>
  <script id="swagger" type="application/json">${open_api_doc}</script>
  <script>
    window.onload = () => {
      let objSpec = JSON.parse(document.getElementById('swagger').text)
      window.ui = SwaggerUIBundle({
        spec: objSpec,
        dom_id: '#swagger-ui',
        presets: [
          SwaggerUIBundle.presets.apis,
          // SwaggerUIStandalonePreset
        ],
        // layout: "StandaloneLayout",
      });
    };
  </script>
  </body>
</html>`,
];

export const handler: Handler = async (event) => {
  const theme: number | null =
    Number(event.queryStringParameters?.theme) || null;
  const openapi = JSON.stringify(
    await open_api_doc(event.requestContext.stage),
    null,
    2,
  );

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'text/html',
    },
    body:
      theme === null
        ? themes[0](openapi)
        : themes[theme] === undefined
        ? themes[0](openapi)
        : themes[theme](openapi),
  };
};
