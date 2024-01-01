const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        shortId: {
            type: String,
            required: true,
            unique: true,
        },
        redirectURl: {
            type: String,
            required: true,
        },
        visitHistory: [{ timestamp: { type: Number } }],
    },
    { timestamp: true }
);

const URL = mongoose.model('url', userSchema);

module.exports = URL;
