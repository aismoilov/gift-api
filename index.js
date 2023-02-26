const express = require('express');
var cors = require('cors')
const bodyParser = require('body-parser');
require('dotenv').config()
const app = express();
const port = process.env.SERVER_PORT || 5000;

const giftRoutes = require('./routes/gift.routes.js');
const userRoutes = require('./routes/user.routes.js');

const giftService = require('./services/giftService');
const { dbMigration, dbSeed } = require("./db/migration");

app.use(cors())
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.get('/api', (req, res) => {
    res.json({ message: 'alive' });
});

app.use('/api/gift', giftRoutes);
app.use('/api/user', userRoutes);

app.listen(port, () => {
    console.log(`Server is runnig on port:${port}`);
    dbMigration();
    dbSeed();
});