// app/routes/authentication.routes.js

'use strict';

module.exports = function(app, passport) {

    // login authentication
    app.post('/auth/login', passport.authenticate('local-login', {
        successRedirect: '/_layout',
        failureRedirect: '/',
        failureFlash: true
    }));

    // logout
    app.post("/logout", function(req, res) {
        req.logOut();
        res.send(200);
    });

    // signup
    app.post('/auth/signup', passport.authenticate('local-signup'), function(req, res) {
        res.redirect('/');
    });

    // logged in checking
    app.get("/auth/loggedin", function(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    });
};

// check the user logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}