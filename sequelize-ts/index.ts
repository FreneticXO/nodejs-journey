import express from 'express';
const app = express();
const port = 3000;
import db from './models'
import { users } from './seeders/users';
import { projects } from './seeders/projects';


app.get('/', (req, res) => {
    db.User.findAll().then((result: object) => res.json(result)).catch((err: object) => 
    console.error(err))
})

const createUsers = () => {
    users.map(user => {
        db.User.create(user).then(() => {
            console.log('success')
        })
        .catch((err: any) => {
            console.log(err)
        });
    })
}

const createProjects = () => {
    projects.map(project => {
        db.Project.create(project).then(() => {
            console.log('success');
        })
        .catch((err: any) => {
            console.log(err)
        });
    })
}

createUsers();
createProjects();

db.sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log(`App listening at port  ${port}`);
    })
}) 

