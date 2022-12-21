const { response } = require('express');

const getHospitales = (req, res = response) => {

    res.json({
        ok: true,
        msg: 'Hola Mundo Hospital'
    });

}

const crearHospital = (req, res = response) => {

    res.json({
        ok: true,
        msg: 'Crear Hospital'
    });

}

const actualizarHospital = (req, res = response) => {

    res.json({
        ok: true,
        msg: 'Hospital actualizado'
    });

}

const eliminarHospital = (req, res = response) => {

    res.json({
        ok: true,
        msg: 'Hospital eliminado'
    });

}

module.exports = {
    getHospitales,
    crearHospital,
    actualizarHospital,
    eliminarHospital
}