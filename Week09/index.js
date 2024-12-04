// Importing libraries
require('dotenv').config();
const express = require('express');
const session = require('express-session')
const app = express();
const expbs = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;

// configure routes
const routes = require('./routes/index.route');

// Sending static files with Express 
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

const hbs = expbs.create({
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views/layouts'),
    partialsDir: path.join(__dirname, 'views/partials'),
    extname: '.hbs',
    // create custom express handlebars helpers
    helpers: {
        eq: function (v1, v2) {
            return v1 === v2;
        },
        add: function (v1, v2) {
            return v1 + v2;
        },
        subtract: function (v1, v2) {
            return v1 - v2;
        },
        genArrayFromInt: function (num) {
            const arr = [];
            for (let i = 1; i <= num; i++) {
                arr.push(i);
            }
            return arr;
        }
    }
});

// Express Handlebars Configuration
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');


// Use the session middleware
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
}))
// Configure Routes
app.use('/', routes);

app.listen(port, () => {
    console.log('Server is starting at port ', port);
});