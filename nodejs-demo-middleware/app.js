import express from 'express';
import path from 'path';
import cors from 'cors';
import config from './config';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import uuidv4 from 'uuid/v4';
import sessionFileStore from 'session-file-store';
import hbs from 'express-hbs';
import logger from 'morgan';
import indexRouter from './routes/index';
import relativePath from './helpers';

let FileStore = sessionFileStore(session);

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs')
// Hook in express-hbs and tell it where known directories reside
app.engine( 'hbs', hbs.express4( {
  extname: 'hbs',
  defaultLayout: __dirname + '/views/templates/layout.hbs',
  layoutsDir: __dirname + '/views/templates/',
  partialsDir: __dirname + '/views/partials/',
}));

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  genid: (req) => {
    return uuidv4();
  },
  store: new FileStore(),
  secret: config.secret,
  resave: false,
  saveUninitialized: true
}));

app.use((req, res, next) => {
  next();
});

app.use('/', indexRouter);

// create the homepage route at '/'
app.get('/', (req, res) => {
  console.log('Inside the homepage callback function');
  console.log(req.sessionID);
  res.send(`You hit home page!\n`);
});

// Register sync helper
hbs.registerHelper('link', function(text, options) {
  var attrs = [];
  for (var prop in options.hash) {
    attrs.push(prop + '="' + options.hash[prop] + '"');
  }
  return new hbs.SafeString('<a ' + attrs.join(' ') + '>' + text + '</a>');
});

// Register Async helpers
hbs.registerAsyncHelper('readFile', function(filename, cb) {
  fs.readFile(fp.join(viewsDir, filename), 'utf8', function(err, content) {
    if (err) console.error(err);
    cb(new hbs.SafeString(content));
  });
});

const port = (config.environment === 'production' ? 8080 : config.port);
app.listen(port, () => {
    console.log(`Running application in ${config.environment} listening on port ${port}!`);
});