/*
    ruta: api/upload/
*/
const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const { fileUpload } = require('../controllers/upload')

const router = Router();

router.put('/:tabla/:id', validarJWT, fileUpload);

module.exports = router;