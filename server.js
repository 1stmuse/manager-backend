const express = require('express');
const bodyParser= require('body-parser');
const cors = require('cors')
const mongoose= require('mongoose')
const path = require('path')

require('dotenv').config();

const app = express()
const port= process.env.PORT || 2000

// app.use(bodyParser)
app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname,"public/build")))

const uri= 'mongodb+srv://muse_1st:akinn@cluster0-d1txe.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(uri, {useNewUrlParser:true, useUnifiedTopology:true});
const connection=mongoose.connection;
connection.once('open', ()=>{
    console.log('connected')
})

const playerRouter = require('./routes/player');
const managerRouter = require('./routes/manager');

app.use('/players', playerRouter);
app.use('/managers', managerRouter)


app.listen(port, ()=>{
    console.log('server running')
});