const userModel = require('../models/user');
const { setUser } = require('../service/auth');

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

    const token = setUser(user);
    res.cookie('uid', token);
    return res.redirect('/');
}

module.exports = {
    handleUserSignup,
    handleUserLogin,
};
