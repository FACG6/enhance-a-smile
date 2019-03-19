const express = require('express');
const { join } = require('path');
const exphbs = require('express-handlebars');
const cookieParser = require('cookie-parser');
const { router } = require('./controllers/index');
require('dotenv').config();

const app = express();
app.disable('x-powered-by');
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(join(__dirname, '..', 'public')));
app.set('port', process.env.PORT || 7425);
app.set('views', join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine('hbs', exphbs({
  extname: 'hbs',
  layoutsDir: join(__dirname, 'views', 'layouts'),
  partialsDir: join(__dirname, 'views', 'partials'),
  defaultLayout: 'main',
}));
app.use(router);

module.exports = app;
