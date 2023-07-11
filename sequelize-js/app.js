const express =require('express');
const app = express();
app.use(express.json())

const { sequelize, User } = require('./models');


app.post('/users', async(req, res) => {
    const { name, email, role } = req.body

    try{
        const user = await User.create({ name, email, role })
        return res.json(user);
    }catch(err) {
        console.error(err)
        return res.status(500).json(err)
    }

});

app.get('/users', async(req, res) => {

    try {
        const users = await User.findAll()
        res.json(users);
    } catch(err) {
        console.error(err);
        res.status(500).json({error: 'Error: Cannot get users'});
    }

})

app.get('/users/:id', async(req, res) => {
    
    const id = req.params.id;
    try {
        const user = await User.findByPk(id);
        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({error: `Error: Cannot get user with id: ${id}`});
    }
})


app.delete('/delete/:id', async(req, res) => {

    const id = req.params.id;
    try {
        User.destroy({
            where: { id }
        })
        res.json({message: "record deleted"})
    } catch(err) {
        console.error(err);
        res.sendStatus(500);
    }
})

app.put('/update/:id', async(req, res) => {
    
    const id = req.params.id;
    const { name, email, role } = req.body;
    try {
        const user = await User.findByPk(id);
        if(!user) {
            res.status(404).json({error: 'User not found'});
        }

        user.name = name;
        user.email = email;
        user.role = role;
        await user.save();

        res.json(user);

    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
})



app.listen(5000,  async () => {
    console.log('Server up and running')
    User.sync() 
    console.log("Database synced")

})
