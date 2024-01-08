const jwt = require('jsonwebtoken');
// ENV
const secretKey = 'urlEncoded@';

function setUser(user) {
    return jwt.sign(
        {
            _id: user._id,
            email: user.email,
        },
        secretKey
    );
}

function getUser(token) {
    if (!token) return null;
    try {
        return jwt.verify(token, secretKey);
    } catch (error) {
        console.log(error);
        return null;
    }
}

module.exports = {
    setUser,
    getUser,
};
