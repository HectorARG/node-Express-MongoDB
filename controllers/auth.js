const { response } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');

const login = async(req, res = response) =>{

    const { email, password } = req.body;  

    try {
        //Verificar Email
        const existeUsuarioDB = await Usuario.findOne({ email });

        if( !existeUsuarioDB ){
            return res.status(400).json({
                ok: false,
                msg: 'Email o contraseña no valido'
            })
        }

        //Verificar Contraseña
        const validPassword = bcrypt.compareSync( password, existeUsuarioDB.password );

        if(!validPassword){
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña o Email no valido'
            })
        }

        //Generar el token JWT
        const token = await generarJWT( existeUsuarioDB._id )

        res.status(200).json({
            ok: true,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }

}

const googleSingIn = async(req, res = response) =>{

    try {

        const { email, name, picture } = await googleVerify( req.body.token )

        res.status(200).json({
            ok: true,
            email, name, picture
        });
        
    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: 'Error de inicio de sesion con tu cuenta Google'
        });
    }


}


module.exports = {
    login,
    googleSingIn
}
