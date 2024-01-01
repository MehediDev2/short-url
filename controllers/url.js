const shortid = require('shortid');
const URL = require('../models/url');

async function handleGenerateNewShortURL(req, res) {
    const { body } = req;
    if (!body.url) return res.status(400).json({ error: 'url is required' });
    const shortId = shortid(8);
    await URL.create({
        shortId,
        redirectURl: body.url,
        visitHistory: [],
    });

    return res.render('home', {
        id: shortId,
    });
}

async function handleGetAnalytics(req, res) {
    const { shortId } = req.params;
    const result = await URL.findOne({ shortId });
    res.status(200).json({
        totalClick: result.visitHistory.length,
        analytics: result.visitHistory,
    });
}

module.exports = {
    handleGenerateNewShortURL,
    handleGetAnalytics,
};
