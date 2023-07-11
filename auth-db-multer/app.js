const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const multer = require('multer');
const path = require('path');
dotenv.config()

const auth = require("./auth");

app.use(express.json());

const { getNotes, getNote, createNote, deleteNote, updateNote, getUsers, createUser, getPassowrd } = require('./database');



// const upload = multer({dest: 'uploads/'})

// MULTER implementation ----------

const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => {
        const fileName = file.originalname;
        cb(null, fileName);
    }
}) 

const upload = multer({ storage })

app.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        res.status(400).send('No file uploaded');
    } else {
        res.send('File uploaded successfully');
    }
})

app.post('/upload_mult', upload.array('files', 3), (req, res) => {
    if(!req.files) {
        res.status(400).send('No file uploaded.')
    } else {
        res.send('Multiple files uploaded')
    }
})

//----------



app.post("/welcome", auth, (req, res) => {
    res.status(200).send("Welcome");
})


app.get('/users', (req, res) => {
    getUsers((err, users) => {
        res.json(users);
    })
})

app.post('/users', async (req, res) => { // User Register
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        
        createUser(req.body.name, hashedPassword, (err, note) => {
            const user = { name: req.body.name }
            const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "30s", });
            user.token = token;
            res.status(201).json(user);
        })

    } catch (error) {
        console.error("Error signing up user:", error);
        res.status(500).send("Error signing up user.");
    }
});

// app.post('/users/login', async (req, res) => {
//     try {
//         //TODO: Fix user.passowrd replace/edit
//         bcrypt.compare(req.body.password, user.password)
//     }
// })

app.post("/login", async (req, res) => {
    const username = req.body.name;
    const pass = req.body.password;
    var passw;

    // Authentication
    getPassowrd(req.body.name,async  (err, note) => {
        // console.log(note[0].encryptedPassword);
        passw = note[0].encryptedPassword;

        try {
            if(await bcrypt.compare(pass, passw)) {

                // JWT Authorization

                const user = { name: username }
                const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "30s", });

                // res.json({ accessToken: accessToken});
                user.token = accessToken;
                res.status(200).json({user});

            } else {
                res.status(400).send("Not allowed");
            }
        } catch {
            res.status(500).send()
        }
        
    })
})


app.get("/notes", (req, res) => {
    getNotes((err, notes) => {
        res.json(notes);
    })
})

app.get("/notes/:id", (req, res) => {
    const id = req.params.id;
    getNote(id, (err, note) => {
        res.json(note);
    })
})

app.post("/notes", auth, (req, res) => { // require auth to post notes
    const { title, contents } = req.body;
    createNote(title, contents, (err, note) => {
        res.status(201).send("New note added");
    })
})

app.delete("/notes/:id", auth,  (req, res) => { // require auth to delete notes
    const id = req.params.id; 
    deleteNote(id, (err, note) => {
        res.send(`Note with id ${id} deleted`);
    })
})

app.put("/notes/:id", auth, (req, res) => { //  require auth to edit notes
    const { title, contents } = req.body;
    const id = req.params.id;
    updateNote(id, title, contents, (err, note) => {
        res.send("Note Updated!");
    })
})


app.listen(8080, () => {
    console.log('Server is running at port: 8080')
})


/*

{
    "title": "note2",
    "contents": "content2"
}

{
    "name": "aman",
    "password": "password"
}


*/

