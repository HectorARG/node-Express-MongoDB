const { response } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');

const getUsuarios = async(req, res) =>{

    const usuarios = await Usuario.find({}, 'nombre role email google');

    res.json({
        ok: true,
        usuarios
    });
}

const postUsuarios = async(req, res = response) =>{

    const { email, password, nombre } =  req.body;
    
    try {

        const existeEmail = await Usuario.findOne({ email });

        if( existeEmail ){
            return res.status(400).json({
                ok: false,
                msg: 'Correo electronico ya registrado'
            })
        }

        const usuario = new Usuario(req.body);

        //Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        //Guardar usuario en BD
        await usuario.save();
        
        res.json({
            ok: true,
            usuario
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        })
    }

    
}

const actualizarUsuario = async(req, res = response) => {

    const uid = req.params.id;

    try {

        console.log(uid)

        const existeUsuario = await Usuario.findById( uid );

        if ( !existeUsuario ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe el usuario'
            });
        }

        //Actualizar
        const { password, google, email, ...campos} = req.body;

        if ( existeUsuario.email !== email ) {

            const existeEmail = await Usuario.findOne({ email });

            if( existeEmail ){
                return res.status(400).json({
                    ok: false,
                    msg: 'Correo electronico ya registrado'
                })
            }
        }

        campos.email = email;

        const actualizarUsuario = await Usuario.findByIdAndUpdate( uid, campos, { new: true } );

        res.json({
            ok: true,
            usuario: actualizarUsuario
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        })
    }

}


module.exports = {
    getUsuarios,
    postUsuarios,
    actualizarUsuario
}