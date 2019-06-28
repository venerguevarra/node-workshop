import express from "express";
import cors from "cors";
import config from "./config";
import __debug from "debug";
import logger from "morgan";
import serveIndex from "serve-index";
import routes from "./routes";
import mariadb from "mariadb";
import db from './db';
import hbs from 'express-hbs';
import fp from 'path';

function relative(path) {
  return fp.join(__dirname, path);
}

const debug = __debug("app:server");

const pool = mariadb.createPool({
  host: config.dbHost,
  user: config.dbUsername,
  password: config.dbPassword,
  database: 'commerce',
  connectionLimit: 5
});
pool.getConnection().then(conn => {
    conn.query("SELECT 1 as val")
        .then(rows => {
          console.log(rows); //[ {val: 1}, meta: ... ]
        })
        .catch(err => {
          //handle error
          console.log(err);
          conn.end();
        });
}).catch(err => {
    console.log('not connected');
});
db.pool = pool;


const app = express();

app.set('views', relative('views'));
app.set('view engine', 'hbs')

// Hook in express-hbs and tell it where known directories reside
app.engine( 'hbs', hbs.express4( {
  defaultLayout: relative('/views/templates/default.hbs'),
  layoutsDir: relative('/views/templates/'),
  partialsDir: [ relative('/views/partials') ],
}));


app.use(logger("tiny"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(relative('public')));
app.use("/", routes.index);
app.use("/__gtg", routes.gtg);
app.use('/pages/account', routes.account);

app.use((err, req, res, next) =>
  res.status(500).json({ message: err.toString(), status: "error" })
);

const port = config.environment === "production" ? 8080 : config.port;
app.listen(port, () => {
  debug(`Running application in ${config.environment} listening on port ${port}!`);
  console.log(`Running application in ${config.environment} listening on port ${port}!`);
});
