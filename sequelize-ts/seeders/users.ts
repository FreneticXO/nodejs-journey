import { v4 as uuid4 } from 'uuid';

export const users = [
    {
        id: uuid4(),
        name: 'Octavio Flores',
        email: 'oflores@zcorp.com',
        password: 'abc123'
    },
    {
        id: uuid4(),
        name: 'Farah Bennis',
        email: 'fbennis@zcorp.com',
        password: 'abc1123'
    },
    {
        id: uuid4(),
        name: 'Obi-Wan Kenobi',
        email: 'obiwan@jedi.com',
        password: 'jediMaster'
    }
]