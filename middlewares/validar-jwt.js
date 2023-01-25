const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario')

const validarJWT = ( req, res, next ) => {

    //Leer el Token
    const token = req.header('x-token');

    if ( !token ){
        return res.status(401).json({
            ok: false,
            msg: 'Peticion sin token registrado'
        })
    }

    try {
        const { uid } = jwt.verify( token, process.env.JWT_SECRET );
        req.uid = uid;
        
        next();
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no valido'
        })
    }
}

const validarADMIN_ROLE = ( req, res, next )=> {

    const uid = req.uid;
    const id = req.params.id;
    
    try {

        const usuarioDB = Usuario.findById(uid);

        if( !usuarioDB ){
            return res.status(404).json({
                ok: false,
                msg: 'Usuario no existe'
            });
        }

        if( usuarioDB.role === 'ADMIN_ROLE' || uid === id ){
            next();
        }else{
            return res.status(403).json({
                ok: false,
                msg: 'No cuentas con los privilegios necesarios para esta accion'
            });
        }


        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}

module.exports = {
    validarJWT,
    validarADMIN_ROLE
}