const { response } = require('express');

const getMedico = (req, res = response) => {

    res.json({
        ok: true,
        msg: 'Hola Mundo Medico'
    });

}

const crearMedico = (req, res = response) => {

    res.json({
        ok: true,
        msg: 'Crear Medico'
    });

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