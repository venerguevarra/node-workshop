import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import config from './config';
import bodyParser from 'body-parser';
import models from './models';
import routes from './routes';

const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.context = {
    models
  };
  next();
});

app.use('/users', routes.user);
app.use('/messages', routes.message);

app.listen(config.hostPort, () => {
    console.log(`Running application in ${config.environment} listening on port ${config.hostPort}!`);
});

