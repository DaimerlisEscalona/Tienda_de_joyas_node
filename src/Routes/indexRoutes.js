const express = require('express');
const router = express.Router();

const indexControllers = require("../Controllers/indexControllers");

router.get("/joyas", indexControllers.getJoyas)
router.get("/joyas/filtros", indexControllers.getFiltros)
router.get("/joyas/joya/:id", indexControllers.getJoya);

module.exports = router;