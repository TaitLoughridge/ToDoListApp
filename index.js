'use strict'
const http = require('http');

const hostname = '127.0.0.1';
const port = 3420;

const express = require('express');
const es6Renderer = require('express-es6-template-engine');
const morgan = require('morgan');
const logger = morgan('tiny');
const helmet = require('helmet');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const cookieParser = require('cookie-parser');


const app = express();

app.use(logger);
app.use(helmet());
app.engine('html', es6Renderer);
app.set('views', './views');
app.set('view engine', 'html');

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use(cookieParser());
app.use(
    session({
        store: new FileStore(),
        secret: 'its raining',
        resave: false,
        saveUninitialized: true,
        is_logged_in: false // THIS IS OURS!!!
    })
);

const server = http.createServer(app);

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`)
});

const rootController = require('./routes/index');

app.use('/', rootController);