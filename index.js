const express = require('express');
const {dbConecction} = require('./db/config')

const app = express();

// Base de datos
dbConecction();

app.get('/',(req,res)=>{
    res.status(200).send("Esto es una petitcion");
});

app.listen(5000,()=>{
    console.log('Servidor escuchando!!!');
})