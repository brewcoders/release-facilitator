const Router = require('koa-router');
const fs = require('fs');
const queries = require('../db/queries/users');
const authenticate = require('../middlewares/authenticate');
const router = new Router();

router.get('/auth/v1/register', async (ctx) => {
    ctx.type = 'html';
    ctx.body = fs.createReadStream('./src/server/views/register.html');
});

router.post('/auth/v1/register', async (ctx) => {
    const user = await queries.addUser(ctx.request.body);
    return passport.authenticate('local', (err, user, info, status) => {
        if (user) {
            ctx.login(user);
            ctx.redirect('/auth/status');
        } else {
            ctx.status = 400;
            ctx.body = { status: 'error' };
        }
    })(ctx);
});

router.get('/auth/v1/status', async (ctx) => {
    if (ctx.isAuthenticated()) {
        ctx.type = 'html';
        ctx.body = fs.createReadStream('./src/server/views/status.html');
    } else {
        ctx.redirect('/auth/login');
    }
});

router.get('/auth/v1/login', async (ctx) => {
    if (!ctx.isAuthenticated()) {
        ctx.type = 'html';
        ctx.body = fs.createReadStream('./src/server/views/login-jwt.html');
    } else {
        ctx.redirect('/auth/status');
    }
});

router.post('/auth/v1/login', async (ctx) => {
    authenticate(ctx);
});

router.get('/auth/v1/logout', async (ctx) => {
    if (ctx.isAuthenticated()) {
        ctx.logout();
        ctx.redirect('/auth/login');
    } else {
        ctx.body = { success: false };
        ctx.throw(401);
    }
});

module.exports = router;