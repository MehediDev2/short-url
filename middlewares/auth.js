const { getUser } = require('../service/auth');

async function restrictToLoggedinUserOnly(req, res, next) {
    const userUID = req.cookies?.uid;
    if (!userUID) return res.redirect('/login');

    const user = getUser(userUID);
    if (!user) return res.redirect('/login');

    req.user = user;
    return next();
}

async function findUser(req, res, next) {
    const userUID = req.cookies?.uid;
    const user = getUser(userUID);
    req.user = user;
    next();
}

module.exports = {
    restrictToLoggedinUserOnly,
    findUser,
};
