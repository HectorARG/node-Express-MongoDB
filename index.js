require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config');

//Crear el seridor Express
const app = express();

//Configurar CORS
app.use(cors());

//Lectura y parseo del body
app.use( express.json() );

//DataBase
dbConnection();

//Ruta
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/login', require('./routes/auth'));

app.listen( process.env.PORT , () =>{
    console.log('App Corriendo listening');
});