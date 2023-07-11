const {createPool} = require('mysql2');

const pool = createPool({
    host: 'localhost',
    user: 'root',
    password: 'ak8823689',
    database: 'notes_app'
})

function getUsers(callback) {
    pool.query(`SELECT * FROM users`, (err, res) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, res);
        }
    });
}

function getPassowrd(username, callback) {
    pool.query(`SELECT encryptedPassword FROM users WHERE username = ?`, [username], async (err, res) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, res);
        }
    })

}

function createUser(name, encryptedPassword, callback) {
    pool.query(`INSERT INTO users (username, encryptedPassword) VALUES (?, ?)`, [name, encryptedPassword], (err, res) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, res);
        }
    })
}


function getNotes(callback) {
    pool.query(`SELECT * FROM notes`, (err, res) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, res);
        }
    });

}

function getNote(id, callback) {

    pool.query(`SELECT * FROM notes WHERE id = ?`, [id], (err, res) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, res);
        }
    });

}

function createNote(title, contents, callback) {
    pool.query(`INSERT INTO notes (title, contents) VALUES (?, ?)`, [title, contents], (err, res) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, res);
        }
    });
}

function deleteNote(id, callback) {
    pool.query(`DELETE FROM notes WHERE id = ?`, [id],  (err, res) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, res);
        }
    });
}

function updateNote(id, newTitle, newContents, callback) {
    pool.query(`UPDATE notes SET title = ?, contents = ? WHERE id = ?`, [newTitle, newContents, id], (err, res) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, res);
        }
    });
}


module.exports = { getNotes, getNote, createNote, deleteNote, updateNote, getUsers, createUser, getPassowrd };