require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config');

//Crear el seridor Express
const app = express();

//Configurar CORS
app.use(cors());

//DataBase
dbConnection();

//Ruta
app.get('/', (req, res) =>{
    res.json({
        ok: true,
        msg: 'Hola mundo'
    });
});

app.listen( process.env.PORT , () =>{
    console.log('App Corriendo listening');
});