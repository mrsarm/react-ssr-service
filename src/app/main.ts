import express from 'express';
import * as bodyParser from 'body-parser';

import {
  errorHandler,
  homeHandler,
  notFoundHandler,
  statusHandler,
  sumHandler,
} from './handlers';

const compression = require('compression');
const router = require('express-promise-router')();
const morgan = require('morgan');

const PORT = process.env.PORT || 3001;
const NODE_ENV = process.env.NODE_ENV || 'dev';
const app = express();

app
  .use(compression())
  .use(morgan(NODE_ENV === 'production' ? 'combined' : 'dev'))
  .use(bodyParser.json({limit: '512kb'}))
  .use('/public', express.static('./src/public', {index: false}))
  .use('/build/img', express.static('./build/img'))
  .use(router)
  .use(notFoundHandler)
  .use(errorHandler);

router.get('/', homeHandler);
router.get('/status', statusHandler);
router.get('/sum', sumHandler);
router.post('/sum', sumHandler);

app.listen(PORT, () => {
  console.log(`🚀 Server is listening on http://localhost:${PORT}`);
});
