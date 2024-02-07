require("dotenv").config()
const express = require('express')
const mongoose = require('mongoose')
const tasksRouter = require('./routers/tasks')
const contactsRouter = require('./routers/contacts')
const bodyParser = require('body-parser');

const cors = require('cors');



console.log("hello")
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/tasks', tasksRouter)
app.use('/contacts', contactsRouter)

const PORT = 8000;
const CONECTION_URL = 'mongodb+srv://had4059:yXzUNLKrKsMBkKjZ@cluster0.q95mr8v.mongodb.net/?retryWrites=true&w=majority'

mongoose.connect(CONECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(
    () => app.listen(PORT, () => console.log(`server runing on port ${PORT}`)))
    .catch((error) => console.log(error.message));
 