const express =require('express');
const app = express();
app.use(express.json())

const { sequelize, User } = require('./models');

const { users } = require('./seeders/users');

const CreateUsers = () => {
    users.map(user => {
        User.create(user).then(() => {
            console.log('success')
        })
        .catch((err) => {
            console.error(err);
        })
    })
}

let response;


exports.addSeeds = async (event, context) => {

    try {
        User.sync();
        CreateUsers();
        response = {
            'statusCode': 200,
            'body': JSON.stringify({
                message: "Seeds added",
                // location: ret.data.trim()
            })
        }
    } catch(err) {
        console.error(err)
        return err
    }
    
    return response;
}

exports.getUsers = async (event, context) => {


    try {
        const users = await User.findAll()
        response = {
            'statusCode': 200,
            'body': JSON.stringify({
                message: users,
                // location: ret.data.trim()
            })
        }
    } catch(err) {
        console.error(err);
        return err
    }
    return response;
}

exports.addUser = async (event, context) => {

    try {

        const { name, email } = JSON.parse(event.body)
        const newUser = await User.create({name, email})
    
        const response = {
            statusCode: 200,
            body: JSON.stringify({
                message: 'User successfully added',
                user: newUser
            })
        };
        return response;
        
    } catch (err) {
        console.error(err);
        const response = {
            statusCode: 500,
            body: JSON.stringify({
                error: 'failed to add user'
            }),
        };

        return response;
    }
}

exports.getUserbyId = async (event, context) => {
    try {

        const { id } = JSON.parse(event.body);
        const user = User.findByPk(id);

        const response = {
            statusCode: 200,
            body: JSON.stringify({
                user: user
            })
        }
        return response;

    } catch (err) {
        console.error(err)

        const response = {
            statusCode: 500,
            body: JSON.stringify({
                message: 'Cannot get user'
            })
        }
        return response;
    }
}

exports.deleteUser = async( event, context ) => {
    try {

        const { id } = JSON.parse(event.body)
        const count = User.destroy({where: id})

        const response = {
            statusCode: 200,
            body: JSON.stringify({
                message: 'User deleted'
            })
        }
        return response;
        
    } catch (err) {

        console.log(err);

        const response = {
            statusCode: 500,
            body: JSON.stringify({
                message: 'User cannot be deleted'
            })
        }
        return response;

    }
}


app.post('/users', async(req, res) => {
    const { id, name, email } = req.body

    try{
        const user = await User.create({ id, name, email })
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


app.delete('/users/:id', async(req, res) => {

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
    const { name, email } = req.body;
    try {
        const user = await User.findByPk(id);
        if(!user) {
            res.status(404).json({error: 'User not found'});
        }

        user.name = name;
        user.email = email;
        await user.save();

        res.json(user);

    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
})



app.listen(5000,  async () => {
    console.log('Server up and running')


    console.log("Database synced")

})
