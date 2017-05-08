// server.js

'use strict';

// requires
const path = require('path');
const express = require('express');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const flash = require('connect-flash');
const expressSession = require('express-session');
const morgan = require('morgan');
const mongoose = require('mongoose');

// Testing

// Db configuration and Connection
const configDb = require('./config/db.config.js');
mongoose.connect(configDb.url);

mongoose.Promise = global.Promise;

require('./app/models/counter.model');
require('./app/models/patient.model');
require('./app/models/user.model');
require('./app/models/doctor.model');
require('./app/models/drug.model');
require('./app/models/test.model');
// require('./app/models/ward.model');

const app = express();
const port = process.env.port || 3000;

// route providers
const clientRoute = require('./app/routes/client.routes');
const serverRoute = require('./app/routes/server.routes');
const PatientRouter = require('./app/api.routes/patient.api.routes');
const DoctorRouter = require('./app/api.routes/doctor.api.routes');
const DrugRouter = require('./app/api.routes/drug.api.routes');
const TestRouter = require('./app/api.routes/test.api.routes');
// const WardRouter = require('./app/api.routes/ward.api.routes');

app.use(morgan('dev'));
app.use(cookieParser());

// body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

// session creation and passport initialize
app.use(expressSession({ secret: 'inwardModule' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// template engine
app.set('view engine', 'jade');
app.set('views', path.join(__dirname, '/public/views'));

app.use('/api/patient', PatientRouter);
app.use('/api/doctor', DoctorRouter);
app.use('/api/drug', DrugRouter);
app.use('/api/test', TestRouter);
// app.use('/api/ward', WardRouter);

require('./config/passport')(passport);
// require('./app/routes/server.routes')(app);
require('./app/routes/client.routes')(app);
require('./app/routes/authentication.routes')(app, passport);

// app.use('/api', serverRoute);

// server start
app.listen(port, function(err) {
    if (err) {
        console.error(err);
        return;
    }

    console.log('Server Started');
});

exports = module.exports = app;

//git remote add upstream https://github.com/Athiththan/inward.git
//git pull upstream master