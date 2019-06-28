import express from 'express';
import path from 'path';
import cors from 'cors';
import config from './config';
import hbs from 'express-hbs';
import routes from './routes';
import fp from 'path';

// user-defined function
// __dirname is a constant variable
function relative(path) {
  return fp.join(__dirname, path);
}

const app = express();

// START: configure express-hbs templating engine
app.set('views', relative('views'));
app.set('view engine', 'hbs');

// Hook in express-hbs and tell it where known directories reside
app.engine( 'hbs', hbs.express4( {
  defaultLayout: relative('/views/templates/default.hbs'),
  layoutsDir: relative('/views/templates/'),
  partialsDir: [ relative('/views/partials') ],
}));
// END: configure express-hbs templating engine

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(relative('public')));

// routing definitions
app.use('/', routes.main);
app.use('/about', routes.about);
app.use('/contact-us', routes.contactUs);
app.use('/dashboard', routes.dashboard);
app.use('/fruits', routes.fruits);
app.use('/veggies', routes.veggies);

const port = (config.environment === 'production' ? 8080 : config.port);
app.listen(port, () => {
    console.log(`Running application in ${config.environment} listening on port ${port}!`);
});