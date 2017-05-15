
var express = require('express');

const app = express();

var port = 5000;

/**
 * Middleware example that will log the method and the URL for ALL routes.
 */
app.use(function(req, res, net){
    console.log('%s %s', req.method, req.url);
    next();
});

/**
 * Example Middleware only for the /users route.  Note that this differs from a route handler in that it will work
 * for any request to /users (such as /users/id).
 */
app.use('/users', function(req, res, next) {
    // req.path will be the req.url with the /users prefix stripped
    console.log('%s', req.path);
    next();
});


app.listen(port, function(err){
    console.log("Listening on port: " + port);
});