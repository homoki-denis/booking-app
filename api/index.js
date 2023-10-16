const bcrypt = require('bcryptjs');
const cors = require('cors');
const express = require('express');
const { default: mongoose } = require('mongoose');

require('dotenv').config()

const User = require('./models/User')

const bcryptSalt = bcrypt.genSaltSync(10);

const app = express();

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

mongoose.connect(process.env.MONGO_URL)

app.get('/test', (req, res) => {
    res.json('test ok');
})

app.post('/register', async (req, res) => {
    const {name, email, password} = req.body;
    try {

        const userDoc = await User.create({
              name,
              email,
              password:bcrypt.hashSync(password, bcryptSalt)
          })
          res.json(userDoc)
    } 

    catch(err) {
        res.status(422).json(err);
    }
   
})



app.listen(4000);