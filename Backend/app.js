const songsRouter = require('./Routes/songsRoutes');
const genreRouter = require('./Routes/genreRoutes');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');

//intantiate express app
const app = express();

//set up middlewares
app.use(cors({origin: '*'}));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));
// block chrome's favicon router
app.use('/favicon.ico', (req, res) => {
    res.status(404).end();
});
// Serve static files from RESOURCES
app.use('/assets', express.static(path.join(__dirname, 'RESOURCES')));
app.use('/api/v1/songs', songsRouter)
app.use('/api/v1/genres', genreRouter)

app.all('*', (req, res, next) => {
    next(new Error(`Can't find ${req.originalUrl} on the server`, 404));
  });
module.exports = app;