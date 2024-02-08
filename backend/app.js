const express = require('express');
const bodyParser = require('body-parser');
const authRouter = require('./routers/authRouter');

const app = express();
const port = 8080;

app.use(bodyParser.json());

app.use('/auth', authRouter);

app.get('/', (req, res) => {
    res.redirect('/auth');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});