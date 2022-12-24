const { response } = require('express');
const { v4: uuidv4 } = require('uuid');

const Usuario = require('../models/usuario');
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');

const fileUpload = async(req, res = response) =>{


    const tipo = req.params.tabla;
    const id = req.params.id;

    //Validar Tipo
    const tiposValidos = [ 'hospitales', 'medicos', 'usuarios' ];

    if( !tiposValidos.includes(tipo) ){
        return res.status(400).json({
            ok: false,
            msg: 'tipo no valido'
        })
    }

    //Validar que existe un archivo
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No hay ningun archivo'
        });
      }

    //Procesar la imagen.....
    const file = req.files.image;

    const nombreCortado = file.name.split('.');
    const extencionArchivo = nombreCortado[ nombreCortado.length - 1 ];

    //Validar Extenciones
    const extencionesValidas = [ 'png', 'jpg', 'jpge', 'gif' ];

    if( !extencionesValidas.includes( extencionArchivo ) ){
        return res.status(400).json({
            ok: false,
            msg: 'tipo de archivo no valido'
        })
    }

    //Generar el nombre del archivo
    const nombreArchivo = `${ uuidv4() }.${ extencionArchivo }`;

    //Path para guardar la imagen
    const path = `./uploads/${ tipo }/${ nombreArchivo }`;

    // Mover la imagen
    file.mv( path, (err) => {
      if (err){
          return res.status(500).json({
            ok: false,
            msg: 'Error Inesperado al mover la imagen'
        })
      }

      res.json({
          ok: true,
          msg: 'Archivo Subido',
          nombreArchivo
      })
      
    });


}


module.exports = {
    fileUpload
}