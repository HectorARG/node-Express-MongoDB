const { response } = require('express');

const Usuario = require('../models/usuario');
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');

const getTodo = async(req, res = response) =>{

    const respuesta = req.params.busqueda;
    const regex = new RegExp( respuesta, 'i' );

    const [ usuarios, medicos, hospitales ] =  await Promise.all([
        Usuario.find({ nombre: regex }),
        Medico.find({ nombre: regex }).populate('hospital', 'nombre img'),
        Hospital.find({ nombre: regex })
    ]);


    res.status(200).json({
        ok: true,
        usuarios,
        medicos,
        hospitales
    });
    
}

const getColeccion = async(req, res = response) =>{

    const respuesta = req.params.busqueda;
    const tabla = req.params.tabla;
    const regex = new RegExp( respuesta, 'i' );

    let data = [];

    switch (tabla) {
        case 'medicos':
            data = await Medico.find({ nombre: regex })
                               .populate('usuario', 'nombre img')
                               .populate('hospital', 'nombre img');
        break;
        case 'hospitales':
            data = await Hospital.find({ nombre: regex })
                                 .populate('usuario', 'nombre img');
        break;
        case 'usuarios':
            data = await Usuario.find({ nombre: regex });
        break;
    
        default:
            return res.status(400).json({
                ok: false,
                msg: 'Busqueda Invalida......'
            });
    }

    res.json({
        ok: true,
        resultados: data
    })
    
}

module.exports = {
    getTodo,
    getColeccion
}