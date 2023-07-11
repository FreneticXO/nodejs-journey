
const express = require('express');
const app = express();

app.use(express.json());  

const messages = [];

app.post('/info', (req, res) => {
    var data = req.body;
    data.timestamp = new Date();
    
    messages.push(data);
    res.sendStatus(200);
})

app.get('/', (req, res) => {
    return res.json(messages);
})

const PORT = process.env.PORT || 5601;

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
})
