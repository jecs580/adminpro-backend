require('dotenv').config();
const express = require('express');
const cors = require('cors');

const {dbConecction} = require('./db/config')

const app = express();

app.use(cors());
// Base de datos
dbConecction();

app.get('/',(req,res)=>{
    res.status(200).send("Esto es una petitcion");
});

app.listen(process.env.PORT,()=>{
    console.log(`Servidor escuchando en el puerto: ${process.env.PORT}`);
})