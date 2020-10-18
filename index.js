require('dotenv').config();
const express = require('express');
const cors = require('cors');



const {dbConecction} = require('./db/config')

const app = express();

app.use(cors());

// Lectura y parseo del body
app.use(express.json());

// Base de datos
dbConecction();

app.use('/api/users',require('./routes/users'));
app.use('/api/login',require('./routes/auth'));

app.listen(process.env.PORT,()=>{
    console.log(`Servidor escuchando en el puerto: ${process.env.PORT}`);
})