// server.js

/**
 * Server.js
 * ---------
 */

'use strict';

// Required
const path = require('path'); // Path Variable
const express = require('express'); // Express Framwork
const methodOverride = require('method-override');
const bodyParser = require('body-parser'); // Body Parser For JSON
const cookieParser = require('cookie-parser');
const passport = require('passport'); // Passport for Local Authentication
const flash = require('connect-flash'); // Flash Message
const expressSession = require('express-session'); // Express Session for Logged Users
const morgan = require('morgan'); // Development Log Tool
const mongoose = require('mongoose'); // Mongo ORM

// Testing

// DB configuration and Connection
const configDb = require('./config/db.config.js');
mongoose.connect(configDb.url); // Connecting To Mongo Connection

mongoose.Promise = global.Promise;

// Model Required
require('./app/models/counter.model'); // Counter Model
require('./app/models/patient.model'); // Patient Model
require('./app/models/user.model'); // User Model
require('./app/models/doctor.model'); // Doctor Model
require('./app/models/drug.model'); // Drug Model
require('./app/models/test.model'); // Test Model
require('./app/models/ward.model'); // Ward Model
require('./app/models/ward.bed.model') // Ward Bed Model
require('./app/models/schedule.model'); //shedule model

const app = express(); // Creating App from Express()
const port = process.env.port || 3000; // Server Port

// Route Modules
const clientRoute = require('./app/routes/client.routes'); // Front-end Routes
const PatientRouter = require('./app/api.routes/patient.api.routes'); // Patient API Routes
const DoctorRouter = require('./app/api.routes/doctor.api.routes'); // Doctor API Routes
const DrugRouter = require('./app/api.routes/drug.api.routes'); // Drug API Routes
const TestRouter = require('./app/api.routes/test.api.routes'); // Test API Routes
const WardRouter = require('./app/api.routes/ward.api.routes'); // Ward API Routes

app.use(morgan('dev')); // Using Morgan
app.use(cookieParser()); // Using Cookie Parser

// Body Parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(express.static(path.join(__dirname, '/public'))); // Static Folder Path Declaration
app.use('/node', express.static(__dirname + '/node_modules')); // Static Folder node as node_modules
app.use('/bower', express.static(__dirname + '/public/libs')); // Static Folder bower as libs
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // Using JSON

// Express Session & Passport Local Authentication Initialization
app.use(expressSession({ secret: 'inwardModule' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash()); // Using Flash Message with Jade | Pug Template

// Template Engine Initialization | Jade | Pug
app.set('view engine', 'jade');
app.set('views', path.join(__dirname, '/public/views')); // Views Folder 

// Routing
app.use('/api/patients', PatientRouter); // Patient Module Routing
app.use('/api/doctors', DoctorRouter); // Doctor Module Routing
app.use('/api/drugs', DrugRouter); // Drug Module Routing 
app.use('/api/tests', TestRouter); // Test Module Routing
app.use('/api/wards', WardRouter); // Ward Module Routing

require('./config/passport')(passport); // Passport Routing
require('./app/routes/client.routes')(app); // Front-end Routing
require('./app/routes/authentication.routes')(app, passport); // Authentication Passport Routing

// Starting Server on Defined Port
app.listen(port, function(err) {
    if (err) {
        console.error(err);
        return;
    }

    console.log('Server Started');
});

// Exporting Application
exports = module.exports = app;

//git remote add upstream https://github.com/Athiththan/inward.git
//git pull upstream master