const { v4: uuidv4 } = require('uuid');
const userModel = require('../models/user');
const { setUser, getUser } = require('../service/auth');

async function handleUserSignup(req, res) {
    const { name, email, password } = req.body;
    await userModel.create({
        name,
        email,
        password,
    });
    return res.redirect('/login');
}

async function handleUserLogin(req, res) {
    const { email, password } = req.body;
    const user = await userModel.findOne({
        email,
        password,
    });
    if (!user) {
        return res.render('login', {
            error: 'Invalid username or password',
        });
    }

    const sessionId = uuidv4();
    setUser(sessionId, user);
    res.cookie('uid', sessionId);

    return res.redirect('/');
}

module.exports = {
    handleUserSignup,
    handleUserLogin,
};
