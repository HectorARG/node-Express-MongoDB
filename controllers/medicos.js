const { response } = require('express');
const Medico = require('../models/medico')


const getMedico = async (req, res = response) => {

    const medicos = await Medico.find().populate( 'usuario', 'nombre email' )
                                       .populate( 'hospital', 'nombre' );

    res.json({
        ok: true,
        medicos
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

const actualizarMedico = async (req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;

    try {

        const medicoExiste = await Medico.findById(id);

        if( !medicoExiste ){
            return res.status(500).json({
                ok: false,
                msg: 'No existe el medico seleccionado'
            });
        }

        const medicoActualizar = {
            ...req.body,
            usuario: uid
        }

        const medicoActualizado = await Medico.findByIdAndUpdate( id, medicoActualizar, { new: true } );

        res.json({
            ok: true,
            msg: 'Medico actualizado',
            hospitall: medicoActualizado
        });
        
    } catch (error) {
        
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado al actualizar el medico'
        });
    }

}

const eliminarMedico = async (req, res = response) => {

    const uid = req.params.id;

    try {

        const medicoExiste = await Medico.findById(uid);

        if( !medicoExiste ){
            return res.status(500).json({
                ok: false,
                msg: 'No existe el medico seleccionado'
            });
        }

        await Medico.findByIdAndDelete( uid );

        res.json({
            ok: true,
            msg: 'Medico eliminado'
        });

    } catch (error) {
        
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado al eliminar Medico'
        });
    }

}

module.exports = {
    getMedico,
    crearMedico,
    actualizarMedico,
    eliminarMedico
}