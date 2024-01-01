const express = require('express');
const path = require('path');
const urlRoute = require('./routes/url');
const { connectToMongoDb } = require('./connection');
const URL = require('./models/url');
const staticRouter = require('./routes/staticRouter');

const port = 3000;
const app = express();
connectToMongoDb('mongodb://127.0.0.1:27017/short-url')
    .then(() => console.log('Mongodb Connected'))
    .catch((err) => console.log(err));

// EJS set up
app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));
// Middleware Plugins
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// Routes
app.use('/', staticRouter);
app.use('/url', urlRoute);

app.get('/url/:shortId', async (req, res) => {
    const { shortId } = req.params;
    const entry = await URL.findOneAndUpdate(
        { shortId },
        {
            $push: {
                visitHistory: {
                    timestamp: Date.now(),
                },
            },
        }
    );
    res.redirect(entry.redirectURl);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
