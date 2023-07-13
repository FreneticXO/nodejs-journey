// import { v4 as uuid4 } from 'uuid';

const {v4: uuid4} = require('uuid')

const users = [
    {
        id: 1,
        name: 'Octavio Flores',
        email: 'oflores@zcorp.com'
    },
    {
        id: 2,
        name: 'Farah Bennis',
        email: 'fbennis@zcorp.com'
    },
    {
        id: 3,
        name: 'Obi-Wan Kenobi',
        email: 'obiwan@jedi.com'
    }
]

module.exports = { users } 