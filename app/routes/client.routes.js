// app/client.routes.js

'use strict';

const path = require('path');

module.exports = function(app) {

    // rendering _layout.jade if only user logged in
    app.get('/_layout', isLoggedIn, (req, res) => {
        res.render('shared/_layout.jade', { user: req.user });
    });

    app.get('/template/:folder/:partial', isLoggedIn, (req, res) => {
        res.render(req.params.folder + '/' + req.params.partial + '.jade');
    });

    // rendering dashboard.jade
    app.get('/template/:partial', isLoggedIn, (req, res) => {
        res.render(req.params.partial + '.jade');
    });

    app.get('/signup', (req, res) => {
        res.render('account/signup.jade', { message: req.flash('signupMessage') });
    });

    app.get('/', (req, res) => {
        res.render('account/login.jade', { message: req.flash('loginMessage') });
    });

    app.get('*', (req, res) => {
        res.render('shared/error.jade');
    });

};

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}