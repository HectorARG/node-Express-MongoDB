const path = require('path');
const fs = require('fs');

const { response } = require('express');
const { v4: uuidv4 } = require('uuid');

const { actualizarImagen } = require('../helpers/actualizar-imagen');

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
    const extencionesValidas = [ 'png', 'jpg', 'jpeg', 'gif' ];

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

    //Actualizar BD
    actualizarImagen( tipo, id, nombreArchivo );

      res.json({
          ok: true,
          msg: 'Archivo Subido',
          nombreArchivo
      })
      
    });


}

const getImagen = ( req, res = response ) =>{

    const tipo = req.params.tabla;
    const imagen = req.params.imagen;

    const pathImg = path.join( __dirname, `../uploads/${ tipo }/${ imagen }` );
    const pathDefecto = path.join( __dirname, `../uploads/defecto/6f57760966a796644b8cfb0fbc449843.png` );
    
    if ( fs.existsSync( pathImg ) ) {
        res.sendFile( pathImg );
    }else {
        res.sendFile( pathDefecto );
    }


} 


module.exports = {
    fileUpload,
    getImagen
}