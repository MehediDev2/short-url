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
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
        },
    },
    { timestamp: true }
);

const URL = mongoose.model('url', userSchema);

module.exports = URL;
