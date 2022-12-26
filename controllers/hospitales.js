const { response } = require('express');
const Hospital = require('../models/hospital')

const getHospitales = async(req, res = response) => {

    const hospitales = await Hospital.find().populate( 'usuario', 'nombre email' );

    res.json({
        ok: true,
        hospitales
    });

}

const crearHospital = async (req, res = response) => {

    const uid = req.uid;
    const hospital = new Hospital( {
         usuario: uid,
         ...req.body
    } );

    try {

        const hospitalDB = await hospital.save();



        res.status(200).json({
            ok: true,
            hospital: hospitalDB
            
        });   
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error hable con el administrador'
            
        });
    }

}

const actualizarHospital = async (req, res = response) => {

    const hospitalID = req.params.id;
    const uid = req.uid;

    try {

        const existeHospital = await Hospital.findById(hospitalID);

        if( !existeHospital ){
            return res.status(500).json({
                ok: false,
                msg: 'No existe el hospital seleccionado'
            });
        }

        // existeHospital.nombre = req.body.nombre;//Actualizar pero de campo en campo (Tedioso)

        const cambiosHospital = {
            ...req.body,
            usuario: uid
        }

        const hospitalActualizado = await Hospital.findByIdAndUpdate( hospitalID, cambiosHospital, { new: true } );

        res.json({
            ok: true,
            msg: 'Hospital actualizado',
            hospital: hospitalActualizado
        });
        
    } catch (error) {
        
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado al actualizar el hospital'
        });
    }


}

const eliminarHospital = async (req, res = response) => {

    const uid = req.params.id;

    try {

        const existeHospital = await Hospital.findById(uid);

        if( !existeHospital ){
            return res.status(500).json({
                ok: false,
                msg: 'No existe el hospital seleccionado'
            });
        }

        await Hospital.findByIdAndDelete( uid );

        res.json({
            ok: true,
            msg: 'Hospital eliminado'
        });

    } catch (error) {
        
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado al eliminar hospital'
        });
    }

}

module.exports = {
    getHospitales,
    crearHospital,
    actualizarHospital,
    eliminarHospital
}