import serialize from 'serialize-javascript';
import path from 'path';
import fs from 'fs';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

let indexHtml: string | undefined;

/**
 * Get the string content of the static file index.html,
 * the content is loaded from the filesystem only once
 * in the first call. 
 */
async function getIndexHtml(): Promise<string> {
  if (indexHtml) return indexHtml;
  return new Promise((resolve, reject) => {
    const indexFile = path.resolve('./src/app/index.html');
    fs.readFile(indexFile, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      }
      indexHtml = data;
      resolve(data);
    });
  });
}

export default async function renderPage<P>(Element: React.ReactElement<P>): Promise<string> {
  const app = ReactDOMServer.renderToString(Element);
  const data = await getIndexHtml();
  return data
    .replace(
      '<div id="root"></div>', 
      `<div id="root">${app}</div>`,
    );
}
