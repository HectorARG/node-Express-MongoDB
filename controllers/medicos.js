const { response } = require('express');
const Medico = require('../models/medico')


const getMedico = (req, res = response) => {

    res.json({
        ok: true,
        msg: 'Hola Mundo Medico'
    });

}

const crearMedico = async (req, res = response) => {

    const uid = req.uid;
    const medico = new Medico( {
         usuario: uid,
         ...req.body
    });

    try {

        const medicoDB = await medico.save();

        res.status(200).json({
            ok: true,
            medico: medicoDB
            
        });   
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error hable con el administrador'
            
        });
    }

}

const actualizarMedico = (req, res = response) => {

    res.json({
        ok: true,
        msg: 'Medico actualizado'
    });

}

const eliminarMedico = (req, res = response) => {

    res.json({
        ok: true,
        msg: 'Medico eliminado'
    });

}

module.exports = {
    getMedico,
    crearMedico,
    actualizarMedico,
    eliminarMedico
}