/*
    Ruta: /api/usuarios
*/
const { Router } = require('express');
const { getUsuarios, postUsuarios } =  require('../controllers/usuarios');

const router = Router();

router.get('/', getUsuarios );
router.post('/', postUsuarios );


module.exports = router;