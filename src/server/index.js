const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const session = require('koa-session');
const passport = require('koa-passport');
const jwt = require('./middlewares/jwt');
const json = require('koa-json')

const indexRoutes = require('./routes/index');
//const movieRoutes = require('./routes/movies');
const userRoutes = require('./routes/users');
const userJwtRoutes = require('./routes/users-jwt');

const app = new Koa();
const PORT = process.env.PORT || 8999;

// sessions
app.keys = ['super-secret-key'];
app.use(session(app));
app.use(json())
// body parser
app.use(bodyParser());

// authentication
require('./auth');
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser());
app.use(indexRoutes.routes());
app.use(userRoutes.routes());
app.use(userJwtRoutes.routes());

/*
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
*/

app.use(jwt);
//app.use(movieRoutes.routes());



const server = app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
});

module.exports = server;