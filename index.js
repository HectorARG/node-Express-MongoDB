const express = require('express');
const { dbConnection } = require('./database/config')

//Crear el seridor Express
const app = express();

//DataBase
dbConnection();

//Ruta
app.get('/', (req, res) =>{
    res.json({
        ok: true,
        msg: 'Hola mundo'
    })
} )

app.listen(3000, () =>{
    console.log('App Corriendo listening');
});