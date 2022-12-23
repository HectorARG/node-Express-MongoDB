const { response } = require('express');

const Usuario = require('../models/usuario');
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');

const fileUpload = async(req, res = response) =>{


    const tipo = req.params.tipo;
    const id = req.params.id;

    //Validar Tipo
    const tiposValidos = [ 'hospitales', 'medicos', 'usuarios' ];

    if( !tiposValidos.includes(tipo) ){
        return res.status(400).json({
            ok: false,
            msg: 'tipo no valido'
        })
    }


    res.json({
        ok: true,
        msg: 'file'
    })
}


module.exports = {
    fileUpload
}