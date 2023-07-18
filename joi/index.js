const { authSchema } = require('./validation_schema')

const express = require('express')
const app = express();
app.use(express.json())

app.post('/register', async(req, res) => {
    try {
        const {email, password} = req.body;
        const result = await authSchema.validateAsync(req.body);
        console.log(result)
        res.send("user registered successfully")
    } catch (err) {
        console.error(err)
        res.status(422).send("Invalid credentials")

    }
    
})

app.listen(8080, () => {
    console.log("server is listening on port 8080");
})