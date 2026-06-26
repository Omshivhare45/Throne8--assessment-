const rateLimiter = require('express-rate-limit');

const authLimiter = rateLimit({
    windoMs : 15 * 60 * 1000,
    max : 10,
    message:{ message: 'Too many attempts. Try again 15 minutes'},
    standardHeaders: true,
    legacyHeaders: false,
});

const formLimiter = rateLimit ({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: { message: "Too many submissions, Try again later. "},
    standardHeaders: true,
    legacyHeaders: false
});

module.exports = { authLimiter, formLimiter };