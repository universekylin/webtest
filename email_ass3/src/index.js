const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const functions = require('firebase-functions');
const app = express();
const email = require('./email.js')

app.use(express.json());
app.use(cors());
app.use(helmet());

app.get('/', (req, res) => {
    res.send('Welcome to heathcare community!');
});

app.post('/email/login', (req, res) => {
    to_email = req.body.to_email
    result = email.sendWelcomeEmail(to_email)
    res.send({
        "request": "send login email to " + to_email,
        "success": result,
    })
})


app.listen(3014, () => {
    console.log(`App listening on port 3001`);
});

exports.api = functions.https.onRequest(app);

exports.api = functions.https.onRequest(app)
