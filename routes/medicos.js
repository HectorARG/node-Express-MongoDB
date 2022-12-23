/*
    /api/medicos
*/
const { Router } = require("express");
const { check } = require("express-validator");
const { getMedico, crearMedico, actualizarMedico, eliminarMedico } = require("../controllers/medicos");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router();

router.get("/", validarJWT, getMedico);

router.post("/", [
    validarJWT,
    check('nombre', "El nombre del Medico es obligatorio").not().isEmpty(),
    check('hospital', "El hospital es obligatorio").isMongoId(),
    validarCampos
], crearMedico);

router.put("/:id", [], actualizarMedico);

router.delete("/:id", validarJWT, eliminarMedico);

module.exports = router;
