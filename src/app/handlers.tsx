import React from 'react';
import { ErrorRequestHandler, Request, Response } from 'express';

import renderPage from './render';

import App from '../components/App';
import Err from '../components/Err';
import Home from '../components/Home';
import NotFound from '../components/NotFound';

export async function homeHandler (req: Request, res: Response) {
  return res.send(await renderPage(<Home />));
};

export async function sumHandler (req: Request, res: Response) {
  const num1 = req.query.num1 ? parseInt(req.query.num1 as string, 10) : 0;
  const num2 = req.query.num2 ? parseInt(req.query.num2 as string, 10) : 0;
  const clientString = await renderPage(<App num1={num1} num2={num2} />);
  return res.send(clientString);
}

export async function notFoundHandler (req: Request, res: Response) {
  return res.status(404).send(await renderPage(<NotFound />));
};

export const errorHandler: ErrorRequestHandler = async (err, req, res, next) => {
  if (err instanceof Error) {
    return res.status(500).send(await renderPage(<Err msg={err.message || err.toString()} />));
  }
  return res.status(404).send(await renderPage(<NotFound />));
};
