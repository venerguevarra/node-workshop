import express from 'express';
import cors from 'cors';
import config from './config';
import __debug from 'debug';
import routes from './routes';
import logger from 'morgan';
import serveIndex from 'serve-index';
import models from './models';

const debug = __debug('app:server');

const app = express();

app.use((req, res, next) => {
  req.context = {
    models
  };
  next();
});

app.use(logger('tiny'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/ftp', express.static('public'), serveIndex('public', {'icons': true}));
app.use('/', routes.index);
app.use('/users', routes.user);
app.use('/middleware', routes.middleware);
app.use('/upload', routes.upload);
app.use('/__gtg', routes.gtg);

app.use((err, req, res, next) => res.status(500).json({ message: err.toString(), status: 'error' }));

const port = (config.environment === 'production' ? 8080 : config.port);
app.listen(port, () => {
  debug(`Running application in ${config.environment} listening on port ${port}!`);
  console.log(`Running application in ${config.environment} listening on port ${port}!`);
});