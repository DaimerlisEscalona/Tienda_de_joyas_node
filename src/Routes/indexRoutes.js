const express = require('express');
const router = express.Router();
const { reportarConsulta } = require("../middleware/reportarConsulta");

const indexControllers = require ("../Controllers/indexControllers");

router.get("/joyas", reportarConsulta,indexControllers.getJoyas)
router.get("/joyas/filtros",reportarConsulta, indexControllers.getFiltros)
router.get("/joyas/joya/:id",reportarConsulta, indexControllers.getJoya);

module.exports = router;