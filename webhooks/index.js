
const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const axios = require('axios')

app.use(bodyParser.json());
app.use(express.json())

const webhook = {
    payloadUrl: "http://localhost:5601/info",
    secret: "supersecret"
}

app.post('/webhook', (req, res) => {
    //handle webhook request

    const { data } = req.body;

    setTimeout(async () => {
        const { payloadUrl, secret } = webhook;
        try {
            await axios.post(payloadUrl, data, {
                headers: {
                    'x-secret': secret,
                },
            });

        } catch (err) {
            console.error(err);
        }
    }, 0);

    res.sendStatus(200)

})

app.get('/db', (req, res) => {
    res.json(webhook)
})

app.listen(5600, () => console.log(`Webhook receiver listening on port 5600`))

