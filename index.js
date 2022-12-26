require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config');

//Crear el seridor Express
const app = express();

//Configurar CORS
app.use(cors());

//Carpeta Publica
app.use(express.static('public'));

//Lectura y parseo del body
app.use( express.json() );

//DataBase
dbConnection();

//Ruta
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/hospitales', require('./routes/hospitales'));
app.use('/api/todo', require('./routes/busquedas'));
app.use('/api/upload', require('./routes/uploads'));
app.use('/api/medicos', require('./routes/medicos'));
app.use('/api/login', require('./routes/auth'));

app.listen( process.env.PORT , () =>{
    console.log('App Corriendo listening');
});