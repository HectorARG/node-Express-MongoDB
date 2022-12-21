/*
    /api/hospitales
*/
const { Router } = require("express");
const { check } = require("express-validator");
const { getHospitales, crearHospital, actualizarHospital, eliminarHospital } = require("../controllers/hospitales");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router();

router.get("/", validarJWT, getHospitales);

router.post("/", [], crearHospital);

router.put("/:id", [], actualizarHospital);

router.delete("/:id", validarJWT, eliminarHospital);

module.exports = router;
