import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import config from './config'; // user-defined

const app = express();
// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(config.hostPort, () => {
    console.log(`Running application in ${config.environment} listening on port ${config.hostPort}!`);
    console.log(`database username is ${config.dbUsername}`);
});

