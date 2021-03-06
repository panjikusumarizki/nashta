const express = require('express');
const bodyParser = require('body-parser');
const mhsRoutes = require('./src/routes/routes');

const app = express();
const port = 4000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api', mhsRoutes);

app.listen(port, () => {
    console.log(`App running on port ${port}`);
});