/*
    ruta: api/upload/
*/
const { Router } = require('express');
const expressFileUpload = require('express-fileupload');
const { validarJWT } = require('../middlewares/validar-jwt');
const { fileUpload, getImagen } = require('../controllers/upload')

const router = Router();
router.use( expressFileUpload() );

router.put('/:tabla/:id', validarJWT, fileUpload);
router.get('/:tabla/:imagen',  getImagen);

module.exports = router;